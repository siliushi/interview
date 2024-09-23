# Vite
两部分组成：
一个开发服务，服务于开发环境，ESM+HMR
一套构建指令，服务于生产环境，用Rollup打包

Vite将模块区分为依赖和源码两类，提升开发服务启动时间
依赖：在开发时不会变动的纯js，vite会使用esbuild预构建依赖
源码：通常为JSX、CSS或Vue SFC等
Vite以原生ESM方式提供源码，让浏览器接管打包工作


netlify
now


# webpack

# rollup

# 问题
缓慢的服务启动
缓慢的更新


传统：
entry -> 多个route -> 多个module -> budle -> server ready
ESM大包器：
server ready --(HTTP request)-> entry --(Dynamic import)--> route -> module