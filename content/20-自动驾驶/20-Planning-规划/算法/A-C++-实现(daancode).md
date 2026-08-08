---
title: A* C++ 实现（daancode）
url: https://github.com/daancode/a-star/blob/master/source/AStar.cpp
fetch_source: agent_reach:jina
fetched_at: '2026-06-27T18:12:22+00:00'
polished_at: '2026-06-27T18:51:39+00:00'
math_repaired_at: '2026-06-27T19:29:26+00:00'
wikilinks_unbulleted_at: '2026-06-28T05:48:28+00:00'
---

> 概念页：[[AStar-路径搜索|A* 路径搜索]]

# A* C++ 实现（daancode）

[Skip to content](https://github.com/daancode/a-star/blob/master/source/AStar.cpp#start-of-content)

## Navigation Menu
Toggle navigation [Sign in](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fdaancode%2Fa-star%2Fblob%2Fmaster%2Fsource%2FAStar.cpp) Appearance settings * Platform     * AI CODE CREATION         *   [GitHub Copilot Write better code with AI](https://github.com/features/copilot)         *   [GitHub Copilot app Direct agents from issue to merge](https://github.com/features/ai/github-app)         *   [MCP Registry New Integrate external tools](https://github.com/mcp)     * DEVELOPER WORKFLOWS         *   [Actions Automate any workflow](https://github.com/features/actions)         *   [Codespaces Instant dev environments](https://github.com/features/codespaces)         *   [Issues Plan and track work](https://github.com/features/issues)         *   [Code Review Manage code changes](https://github.com/features/code-review)     * APPLICATION SECURITY         *   [GitHub Advanced Security Find and fix vulnerabilities](https://github.com/security/advanced-security)         *   [Code security Secure your code as you build](https://github.com/security/advanced-security/code-security)         *   [Secret protection Stop leaks before they start](https://github.com/security/advanced-security/secret-protection)     * EXPLORE         *   [Why GitHub](https://github.com/why-github)         *   [Documentation](https://docs.github.com/)         *   [Blog](https://github.blog/)         *   [Changelog](https://github.blog/changelog)         *   [Marketplace](https://github.com/marketplace) [View all features](https://github.com/features) * Solutions     * BY COMPANY SIZE         *   [Enterprises](https://github.com/enterprise)         *   [Small and medium teams](https://github.com/team)         *   [Startups](https://github.com/enterprise/startups)         *   [Nonprofits](https://github.com/solutions/industry/nonprofits)     * BY USE CASE         *   [App Modernization](https://github.com/solutions/use-case/app-modernization)         *   [DevSecOps](https://github.com/solutions/use-case/devsecops)         *   [DevOps](https://github.com/solutions/use-case/devops)         *   [CI/CD](https://github.com/solutions/use-case/ci-cd)         *   [View all use cases](https://github.com/solutions/use-case)     * BY INDUSTRY         *   [Healthcare](https://github.com/solutions/industry/healthcare)         *   [Financial services](https://github.com/solutions/industry/financial-services)         *   [Manufacturing](https://github.com/solutions/industry/manufacturing)         *   [Government](https://github.com/solutions/industry/government)         *   [View all industries](https://github.com/solutions/industry) [View all solutions](https://github.com/solutions) * Resources     * EXPLORE BY TOPIC         *   [AI](https://github.com/resources/articles?topic=ai)         *   [Software Development](https://github.com/resources/articles?topic=software-development)         *   [DevOps](https://github.com/resources/articles?topic=devops)         *   [Security](https://github.com/resources/articles?topic=security)         *   [View all topics](https://github.com/resources/articles)     * EXPLORE BY TYPE         *   [Customer stories](https://github.com/customer-stories)         *   [Events & webinars](https://github.com/resources/events)         *   [Ebooks & reports](https://github.com/resources/whitepapers)         *   [Business insights](https://github.com/solutions/executive-insights)         *   [GitHub Skills](https://skills.github.com/)     * SUPPORT & SERVICES         *   [Documentation](https://docs.github.com/)         *   [Customer support](https://support.github.com/)         *   [Community forum](https://github.com/orgs/community/discussions)         *   [Trust center](https://github.com/trust-center)         *   [Partners](https://github.com/partners) [View all resources](https://github.com/resources) * Open Source     * COMMUNITY         *   [GitHub Sponsors Fund open source developers](https://github.com/sponsors)     * PROGRAMS         *   [Security Lab](https://securitylab.github.com/)         *   [Maintainer Community](https://maintainers.github.com/)         *   [Accelerator](https://github.com/accelerator)         *   [GitHub Stars](https://stars.github.com/)         *   [Archive Program](https://archiveprogram.github.com/)     * REPOSITORIES         *   [Topics](https://github.com/topics)         *   [Trending](https://github.com/trending)         *   [Collections](https://github.com/collections) * Enterprise     * ENTERPRISE SOLUTIONS         *   [Enterprise platform AI-powered developer platform](https://github.com/enterprise)     * AVAILABLE ADD-ONS         *   [GitHub Advanced Security Enterprise-grade security features](https://github.com/security/advanced-security)         *   [Copilot for Business Enterprise-grade AI features](https://github.com/features/copilot/copilot-business)         *   [Premium Support Enterprise-grade 24/7 support](https://github.com/premium-support)
*   [Pricing](https://github.com/pricing)

Search or jump to...

# Search code, repositories, users, issues, pull requests...
 Search Clear [Search syntax tips](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax)

# Provide feedback
We read every piece of feedback, and take your input very seriously.
- [x] Include my email address so I can be contacted

 Cancel  Submit feedback

# Saved searches
## Use saved searches to filter your results more quickly
Name Query To see all available qualifiers, see our [documentation](https://docs.github.com/search-github/github-code-search/understanding-github-code-search-syntax).

 Cancel  Create saved search [Sign in](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fdaancode%2Fa-star%2Fblob%2Fmaster%2Fsource%2FAStar.cpp) [Sign up](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F%3Cuser-name%3E%2F%3Crepo-name%3E%2Fblob%2Fshow&source=header-repo&source_repo=daancode%2Fa-star) Appearance settings Resetting focus You signed in with another tab or window. [Reload](https://github.com/daancode/a-star/blob/master/source/AStar.cpp) to refresh your session.You signed out in another tab or window. [Reload](https://github.com/daancode/a-star/blob/master/source/AStar.cpp) to refresh your session.You switched accounts on another tab or window. [Reload](https://github.com/daancode/a-star/blob/master/source/AStar.cpp) to refresh your session.Dismiss alert
{{ message }} [daancode](https://github.com/daancode)/**[a-star](https://github.com/daancode/a-star)**Public
*   [Notifications](https://github.com/login?return_to=%2Fdaancode%2Fa-star)You must be signed in to change notification settings
*   [Fork 133](https://github.com/login?return_to=%2Fdaancode%2Fa-star)
*   [Star 529](https://github.com/login?return_to=%2Fdaancode%2Fa-star)
*   [Code](https://github.com/daancode/a-star)
*   [Issues 5](https://github.com/daancode/a-star/issues)
*   [Pull requests 3](https://github.com/daancode/a-star/pulls)
*   [Actions](https://github.com/daancode/a-star/actions)
*   [Projects](https://github.com/daancode/a-star/projects)
*   [Security and quality 0](https://github.com/daancode/a-star/security)
*   [Insights](https://github.com/daancode/a-star/pulse)

Additional navigation options
*   [Issues](https://github.com/daancode/a-star/issues)
*   [Pull requests](https://github.com/daancode/a-star/pulls)
*   [Security and quality](https://github.com/daancode/a-star/security)
## Collapse file tree
## Files
master Search this repository(forward slash)forward slash/
*         source
    *        AStar.cpp     *        AStar.hpp
*       .travis.yml
*       CMakeLists.txt
*       LICENSE
*       ReadMe.md
*       main.cpp
## Breadcrumbs
1.   [a-star](https://github.com/daancode/a-star/tree/master)
2.   /[source](https://github.com/daancode/a-star/tree/master/source)

# AStar.cpp
Copy path Blame More file actions Blame More file actions

## Latest commit
## History
[History](https://github.com/daancode/a-star/commits/master/source/AStar.cpp) 178 lines (149 loc) · 4.46 KB

## Breadcrumbs

# AStar.cpp
Copy path Top

## File metadata and controls
*   Code
*   Blame

178 lines (149 loc) · 4.46 KB [Raw](https://github.com/daancode/a-star/raw/refs/heads/master/source/AStar.cpp) Copy raw file Download raw file Open symbols panel Edit and raw actions 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161 162 163 164 165 166 167 168 169 170 171 172 173 174 175 176 177 178
#include"AStar.hpp"
#include<algorithm>
#include<math.h>
using namespace std::placeholders;
bool AStar::Vec2i::operator == (const Vec2i& coordinates_)

return (x == coordinates_.x&& y == coordinates_.y);
} AStar::Node::Node(Vec2i coordinates_, Node *parent_)
{  parent = parent_;
 coordinates = coordinates_;
 G = H = 0;
} AStar::uint AStar::Node::getScore()

return G + H;
} AStar::Generator::Generator()
{ setDiagonalMovement(false);
setHeuristic(&Heuristic::manhattan);
 direction = {

 };
} void AStar::Generator::setWorldSize(Vec2i worldSize_)
{  worldSize = worldSize_;
} void AStar::Generator::setDiagonalMovement(bool enable_)
{  directions = (enable_ ? 8 : 4);
} void AStar::Generator::setHeuristic(HeuristicFunction heuristic_)
{  heuristic = std::bind(heuristic_, _1, _2);
} void AStar::Generator::addCollision(Vec2i coordinates_)
{  walls.push_back(coordinates_);
} void AStar::Generator::removeCollision(Vec2i coordinates_)
{ auto it = std::find(walls.begin(), walls.end(), coordinates_);
if (it != walls.end()) {  walls.erase(it);

} void AStar::Generator::clearCollisions()
{  walls.clear();
} AStar::CoordinateList AStar::Generator::findPath(Vec2i source_, Vec2i target_)
{  Node *current = nullptr;
 NodeSet openSet, closedSet;
 openSet.reserve(100);
 closedSet.reserve(100);
 openSet.push_back(new Node(source_));
while (!openSet.empty()) { auto current_it = openSet.begin();
 current = *current_it;
for (auto it = openSet.begin(); it != openSet.end(); it++) { auto node = *it;
if (node->getScore() <= current->getScore()) {  current = node;
 current_it = it;

 } if (current->coordinates == target_) { break;
 }  closedSet.push_back(current);
 openSet.erase(current_it);
for (uint i = 0; i < directions; ++i) {  Vec2i newCoordinates(current->coordinates + direction[i]);
if (detectCollision(newCoordinates) || findNodeOnList(closedSet, newCoordinates)) { continue;
 }  uint totalCost = current->G + ((i <4) ? 10 : 14);
 Node *successor = findNodeOnList(openSet, newCoordinates);
if (successor == nullptr) {  successor = new Node(newCoordinates, current);
 successor->G = totalCost;
 successor->H = heuristic(successor->coordinates, target_);
 openSet.push_back(successor);
 } else if (totalCost < successor->G) {  successor->parent = current;
 successor->G = totalCost;

 }  CoordinateList path;
while (current != nullptr) {  path.push_back(current->coordinates);
 current = current->parent;
 } releaseNodes(openSet);
releaseNodes(closedSet);
return path;
} AStar::Node* AStar::Generator::findNodeOnList(NodeSet& nodes_, Vec2i coordinates_)
{ for (auto node : nodes_) { if (node->coordinates == coordinates_) {
return node;

return nullptr;
} void AStar::Generator::releaseNodes(NodeSet& nodes_)
{ for (auto it = nodes_.begin(); it != nodes_.end();) { delete *it;
 it = nodes_.erase(it);

bool AStar::Generator::detectCollision(Vec2i coordinates_)
{ if (coordinates_.x<0 || coordinates_.x>= worldSize.x ||  coordinates_.y<0 || coordinates_.y>= worldSize.y || std::find(walls.begin(), walls.end(), coordinates_) != walls.end()) {
return true;

return false;
} AStar::Vec2i AStar::Heuristic::getDelta(Vec2i source_, Vec2i target_)
{ return{ abs(source_.x - target_.x), abs(source_.y - target_.y) };
} AStar::uint AStar::Heuristic::manhattan(Vec2i source_, Vec2i target_)
{ auto delta = std::move(getDelta(source_, target_));
return static_cast<uint>(10 * (delta.x + delta.y));
} AStar::uint AStar::Heuristic::euclidean(Vec2i source_, Vec2i target_)
return static_cast<uint>(10 * sqrt(pow(delta.x, 2) + pow(delta.y, 2)));
} AStar::uint AStar::Heuristic::octagonal(Vec2i source_, Vec2i target_)
return 10 * (delta.x + delta.y) + (-6) * std::min(delta.x, delta.y);

## Footer
### Footer navigation
*   [Terms](https://docs.github.com/site-policy/github-terms/github-terms-of-service)
*   [Privacy](https://docs.github.com/site-policy/privacy-policies/github-privacy-statement)
*   [Security](https://github.com/security)
*   [Status](https://www.githubstatus.com/)
*   [Community](https://github.community/)
*   [Docs](https://docs.github.com/)
*   [Contact](https://support.github.com/?tags=dotcom-footer)
*    Manage cookies
*    Do not share my personal information

 You can’t perform that action at this time.

## 相关笔记

[自动驾驶（主题索引）](../../../../index/MOC-autopilot.md)
[[A-算法-PythonC++-实现|A* 算法 Python/C++ 实现]]
[[A-算法-openset-澄清|A* 算法 openset 澄清]]
[[Apollo-Cyber-RT-介绍|Apollo Cyber RT 介绍]]
[[RRT-快速随机树|RRT 快速随机树]]
[[RRT-路径剪枝|RRT 路径剪枝]]
[[RRT-路径规划课程作业|RRT 路径规划课程作业]]
[[圆形障碍-A-路径(切线可见图)|圆形障碍 A* 路径（切线可见图）]]
[[AStar-路径搜索|A* 路径搜索]] — _路径 / 运动规划_
