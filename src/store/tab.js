export default {
    state: {
        isCollapse: false,
        currentMenu: null,//默认当前菜单是主页时为空
        menuTags: [
            {path: "home", authName: "首页", icon: "s-home"},
        ]
    },
    mutations:{
        //侧栏导航菜单缩放
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        //顶部导航菜单面包屑选中
        selectMenu(state,menu){
            state.currentMenu = (menu.path === "home")? null: menu;
        },
        //自封装导航菜单标签componentTag路由映射新增
        mapMenu(state,menu){
            //对象数组是内存地址比较，include等方法无法获取，find用回调比较值获取
            if(!state.menuTags.find(item => item.authName === menu.authName)){
                state.menuTags.push(menu)
            }
        },
        //自封装导航菜单标签componentTag路由映射删除
        popMenu(state,menu){
            const currentRoute = state.menuTags.findIndex(item => item.authName === menu.authName)
            if(currentRoute !== -1){
                state.menuTags.splice(currentRoute+1);
            }
        }
    }
}