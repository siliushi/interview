// 使用 pushState 和 popstate 事件来管理浏览器历史记录和URL。

// 导航和历史记录管理：
// 使用 history.pushState 方法来改变浏览器的 URL，而不会触发页面刷新。
// popstate 事件监听器在用户点击浏览器的前进或后退按钮时触发，并加载相应的路由。
// 拦截链接点击：
// 使用事件委托机制，通过 data-link 属性识别并拦截导航链接的点击事件，调用自定义的 navigateTo 方法进行导航。
// 初始路由加载：
// 在路由器的构造函数中调用 loadInitialRoute 方法，根据当前的 location.pathname 加载适当的路由。
// 匹配路由：
// 简单的路由匹配函数 matchUrlToRoute，将路径与定义的路由进行比较。

class Router {
    constructor(routes) {
        this.routes = routes;
        this.loadInitialRoute();
        this.bindLinkClicks();
        window.addEventListener('popstate', () => this.loadRoute(location.pathname));
    }

    bindLinkClicks() {
        document.body.addEventListener('click', e => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                this.navigateTo(e.target.href);
            }
        });
    }

    navigateTo(url) {
        history.pushState(null, null, url);
        this.loadRoute(url);
    }

    loadRoute(path) {
        const matchedRoute = this.matchUrlToRoute(path);
        const routerOutElement = document.querySelector('#app');
        if (matchedRoute) {
            const urlParams = this.getUrlParams(matchedRoute, path);
            routerOutElement.innerHTML = matchedRoute.template(urlParams);
        } else {
            routerOutElement.innerHTML = '<h1>404 - Page Not Found</h1>';
        }
    }

    matchUrlToRoute(path) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);
            const urlPathSegments = path.split('/').slice(1);

            if (routePathSegments.length !== urlPathSegments.length) {
                return false;
            }

            return routePathSegments.every((routePathSegment, i) => {
                return routePathSegment.startsWith(':') || routePathSegment === urlPathSegments[i];
            });
        });

        return matchedRoute;
    }

    getUrlParams(route, path) {
        const routePathSegments = route.path.split('/').slice(1);
        const urlPathSegments = path.split('/').slice(1);

        return routePathSegments.reduce((params, segment, i) => {
            if (segment.startsWith(':')) {
                const paramName = segment.slice(1);
                params[paramName] = urlPathSegments[i];
            }
            return params;
        }, {});
    }

    loadInitialRoute() {
        this.loadRoute(location.pathname);
    }
}

// 定义路由和对应的模板
const routes = [
    { path: '/', template: () => '<h1>Home</h1><p>Welcome to the homepage!</p>' },
    { path: '/about', template: () => '<h1>About</h1><p>This is the about page.</p>' },
    { path: '/contact', template: () => '<h1>Contact</h1><p>This is the contact page.</p>' },
    { path: '/user/:id', template: (params) => `<h1>User</h1><p>User ID: ${params.id}</p>` }
];

// 初始化路由器
const router = new Router(routes);
