---
title: Protobuf C++ 教程
url: https://blog.csdn.net/K346K346/article/details/51754431
curated_at: '2026-06-28T20:00:00+00:00'
---

# Protobuf C++ 教程

Google Protocol Buffers（ProtoBuf）是跨语言, 可扩展的结构化数据**序列化/反序列化**方案。本文基于 **Proto2** 语法（新版为 Proto3），以 C++ 为例说明用法。

## 1. 序列化与反序列化

**序列化**：对象 → 可存储/传输的字节流。
**反序列化**：字节流 → 内存对象。网络传输, 持久化存储都依赖这一过程。若双方结构体布局不一致（字段顺序, 新增字段位置），直接 `memcpy` 或强制转型会导致解析错误，因此需要**自描述协议**（如 JSON, XML, ProtoBuf）。

### 1.1 裸结构体的问题

```cpp
struct Student {
    char ID[20];
    char name[10];
    int age;
    int gender;
};
```

UDP `sendto(sockfd, &student, sizeof(Student), ...)` 看似可行，但客户端若在末尾增加 `major[10]`，服务端旧结构体无法正确解析新字段——字段布局必须严格一致。

### 1.2 JSON 示例

JSON 文本自描述字段名，新增字段可放在任意位置：

```json
{"ID":"312822199204085698", "name":"dablelv", "age":18, "gender":0, "major":"math"}
```

C++ 使用 JSONcpp 序列化/反序列化示例：

```cpp
#include "JSON/JSON.h"

struct Student {
    char ID[20];
    char name[10];
    int age;
    int gender;
    char major[10];
};

string serializeToJSON(const Student& student) {
    JSON::FastWriter writer;
    JSON::Value person;
    person["ID"] = student.ID;
    person["name"] = student.name;
    person["age"] = student.age;
    person["gender"] = student.gender;
    person["major"] = student.major;
    return writer.write(person);
}

Student deserializeToObj(const string& strJSON) {
    JSON::Reader reader;
    JSON::Value value;
    Student student;
    memset(&student, 0, sizeof(Student));
    if (reader.parse(strJSON, value)) {
        strcpy(student.ID, value["ID"].asString().c_str());
        strcpy(student.name, value["name"].asString().c_str());
        student.age = value["age"].asInt();
        student.gender = value["gender"].asInt();
        if (value.isMember("major"))
            strcpy(student.major, value["major"].asString().c_str());
    }
    return student;
}
```

JSON 体积较大；ProtoBuf 更紧凑, 解析更快。

### 1.3 C++ 序列化方案对比

| 方案 | 特点 |
|------|------|
| XML | 标准统一，体积大，工业场景较少 |
| **ProtoBuf** | 高效, 跨语言, 需预定义 schema + protoc |
| Boost.Serialization | 灵活，标准 C++ 容器支持好 |
| MFC / .NET | 平台绑定 |

推荐跨平台场景：**ProtoBuf** 或 **Boost.Serialization**。

## 2. 使用步骤概览

1. 编写 `.proto` 定义消息
2. `protoc` 编译生成 `.pb.h` / `.pb.cc`
3. 使用 C++ API 序列化/反序列化

### 2.1 基本数据类型

| proto 类型 | C++ 类型 | 说明 |
|------------|----------|------|
| double / float | double / float | 浮点 |
| int32 / int64 | int32 / int64 | 变长编码；负数多用 sint32/sint64 |
| uint32 / uint64 | uint32 / uint64 | 无符号变长 |
| sint32 / sint64 | int32 / int64 | 有符号变长，负数更高效 |
| fixed32 / fixed64 | uint32 / uint64 | 定长 4/8 字节 |
| bool | bool | |
| string / bytes | string | UTF-8 文本 / 任意字节 |

### 2.2 定义 proto 文件

```protobuf
package tutorial;

message Student {
  required uint64 id = 1;
  required string name = 2;
  optional string email = 3;

  enum PhoneType {
    MOBILE = 0;
    HOME = 1;
  }

  message PhoneNumber {
    required string number = 1;
    optional PhoneType type = 2 [default = HOME];
  }

  repeated PhoneNumber phone = 4;
}
```

**package**：对应 C++ 命名空间，防命名冲突。

**字段修饰符**：

| 修饰符 | 含义 |
|--------|------|
| required | 必须赋值；未初始化序列化可能失败 |
| optional | 可缺省，用默认值或 has_ 检查 |
| repeated | 可重复 0..N 次，类似数组 |

**字段编号** 1–15 占 1 字节编码，应留给高频字段；19000–19999 保留不可用。

### 2.3 编译 protoc

安装（源码目录）：

```bash
./configure
make && make check
sudo make install && sudo ldconfig
protoc --version
```

编译 proto：

```bash
protoc -I$SRC_DIR --cpp_out=$DST_DIR student.proto

# 生成 student.pb.h, student.pb.cc
```

### 2.4 生成的 API 要点

每个 message 对应一个 C++ 类。以 `Student` 为例：

```cpp
// id
bool has_id() const;
void clear_id();
uint64 id() const;
void set_id(uint64 value);

// name（string 另有 mutable_name, set_name(const char*) 等）
const string& name() const;
void set_name(const string& value);

// repeated phone
int phone_size() const;
const Student_PhoneNumber& phone(int index) const;
Student_PhoneNumber* add_phone();
```

**标准消息方法**：`IsInitialized()`, `CopyFrom()`, `Clear()`, `ByteSize()`, `DebugString()` 等。

**序列化/反序列化**：

```cpp
bool SerializeToString(string* output) const;
bool ParseFromString(const string& data);
bool SerializeToArray(void* data, int size) const;
bool ParseFromArray(const void* data, int size);
bool SerializeToOstream(ostream* output) const;
bool ParseFromIstream(istream* input);
```

> 不要继承生成的类添加行为；应在外部封装。

### 2.5 完整读写示例

```cpp
#include "student.pb.h"

int main(int argc, char* argv[]) {
    GOOGLE_PROTOBUF_VERIFY_VERSION;

    tutorial::Student student;
    student.set_id(201421031059);
    student.set_name("dablelv");
    student.set_email("dablelv@tencent.com");

    tutorial::Student::PhoneNumber* p1 = student.add_phone();
    p1->set_number("15813354925");
    p1->set_type(tutorial::Student::MOBILE);

    tutorial::Student::PhoneNumber* p2 = student.add_phone();
    p2->set_number("0564-4762652");
    p2->set_type(tutorial::Student::HOME);

    string serializedStr;
    student.SerializeToString(&serializedStr);
    cout << student.DebugString();

    tutorial::Student deserializedStudent;
    if (!deserializedStudent.ParseFromString(serializedStr)) {
        cerr << "Failed to parse student." << endl;
        return -1;
    }

    cout << "ID: " << deserializedStudent.id() << endl;
    cout << "Name: " << deserializedStudent.name() << endl;
    // ... 遍历 phone ...

    google::protobuf::ShutdownProtobufLibrary();
    return 0;
}
```

编译：

```bash
g++ -o protobufTest test.cpp student.pb.cc -lprotobuf
```

若报 `libprotobuf.so` 找不到，将 `/usr/local/lib` 加入 `LD_LIBRARY_PATH` 或配置 `/etc/ld.so.conf.d/` 后 `sudo ldconfig`。

### 2.6 向后兼容规则

- 不可修改已有字段的 tag 号
- 不可增删 **required** 字段
- 可新增 optional/repeated 字段（新 tag）；旧代码忽略未知字段
- 新 optional 字段对旧消息不可见，需 `has_` 检查或设 `[default=...]`

### 2.7 优化建议

- 复用 message 对象减少分配（注意 `SpaceUsed()` 防止膨胀）
- 多线程小对象分配多时可考虑 tcmalloc

## 3. 小结

ProtoBuf 通过 schema + 二进制编码实现高效, 可演进的数据交换，适合 RPC, 日志, 配置与跨语言服务。C++ 侧流程固定：**写 proto → protoc → Serialize/Parse API**。

## 参考文献

<div class="kb-references">
<p>[Protocol Buffers 官网](https://protobuf.dev/)</p>
<p>[Protocol Buffers GitHub](https://github.com/protocolbuffers/protobuf)</p>
<p>Google Protocol Buffer Basics: C++</p>
</div>
## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)

[[DDS-分布式通信|DDS 分布式通信]]

[[Protocol-Buffers-基础|Protocol Buffers 基础]]
