var pathname = window.location.pathname
sessionStorage.setItem('pathname', pathname)
// var path_split = pathname.split('/')
// path_split.forEach((arg) => console.log(arg))
if (pathname != '/my_repositories') {
    window.location = '/my_repositories';
}
