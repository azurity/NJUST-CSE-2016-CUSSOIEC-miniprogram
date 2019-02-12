interface CourseDetailQuery {
    courseID?: string
}

Page({
    /**
     * 页面的初始数据
     */
    data: {},

    /**
     * 生命周期函数--监听页面加载，在此处做需要同步的初始化
     */
    onLoad(query?: CourseDetailQuery) {
        if (query === undefined || query.courseID === undefined) {
            // TODO: 处理确实参数
        } else {
            this.init(query.courseID)
                .then(() => {
                    // TODO: 完成初始化后
                })
                .catch(() => {
                    // TODO: 初始化出错处理
                })
        }
    },

    async init(courseID: string) {
        // TODO: 加载课程详情页
    }
})
