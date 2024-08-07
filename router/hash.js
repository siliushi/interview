class Router {
    constructor(routes) {
        this.routes = routes;
        this.loadInitialRoute();
    }

    loadRoute(...urlSegments) {
        const matchedRoute = this.matchUrlToRoute(urlSegments);
        const url = `#/${urlSegments.join('/')}`;

        const routerOutElement = document.querySelector('#app');
        routerOutElement.innerHTML = matchedRoute ? matchedRoute.template : '<h1>404 - Page Not Found</h1>';
    }

    matchUrlToRoute(urlSegments) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegments = route.path.split('/').slice(1);

            if (routePathSegments.length !== urlSegments.length) {
                return false;
            }

            return routePathSegments.every((routePathSegment, i) => routePathSegment === urlSegments[i]);
        });

        return matchedRoute;
    }

    loadInitialRoute() {
        const pathNameSplit = window.location.hash.substring(1).split('/');
        const pathSegments = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
        this.loadRoute(...pathSegments);
    }
}

// 定义路由和对应的模板
const routes = [
    { path: '/', template: '<h1>Home</h1><p>Welcome to the homepage!</p>' },
    { path: '/about', template: '<h1>About</h1><p>This is the about page.</p>' },
    { path: '/contact', template: '<h1>Contact</h1><p>This is the contact page.</p>' }
];

// 初始化路由器
const router = new Router(routes);

// 监听 hash 变化并更新视图
window.addEventListener('hashchange', () => {
    const pathNameSplit = window.location.hash.substring(1).split('/');
    const pathSegments = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    router.loadRoute(...pathSegments);
});

// 处理初始加载页面的 hash 路径
window.addEventListener('load', () => {
    const pathNameSplit = window.location.hash.substring(1).split('/');
    const pathSegments = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    router.loadRoute(...pathSegments);
});
