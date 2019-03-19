"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        loadModal: false,
        resourceList: []
    },
    downtap: function (event) {
        var _this = this;
        var url = event.currentTarget.dataset.url;
        this.setData({
            loadModal: true
        });
        wx.downloadFile({
            url: url,
            success: function (res) {
                var filePath = res.tempFilePath;
                wx.showToast({
                    title: '下载完成',
                    icon: 'success'
                });
            },
            fail: function () {
                wx.showToast({
                    title: '下载失败',
                    icon: 'none'
                });
            },
            complete: function () {
                _this.setData({
                    loadModal: false
                });
            }
        });
    },
    onLoad: function () {
        this.initSource(wx.getStorageSync('CourseDetail').courseID)
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    initSource: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            var resource;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/resources',
                                method: 'GET',
                                data: {
                                    courseID: courseID
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        resource = _a.sent();
                        if (resource.success) {
                            this.setData({
                                resourceList: resource.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFDNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsU0FBUyxFQUFFLEtBQUs7UUFJaEIsWUFBWSxFQUFrQixFQUFFO0tBQ25DO0lBQ0QsT0FBTyxZQUFDLEtBQWtCO1FBQTFCLGlCQTRCQztRQTNCRyxJQUFJLEdBQUcsR0FBVyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUE7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxZQUFZLENBQUM7WUFDWixHQUFHLEVBQUUsR0FBRztZQUNSLE9BQU8sRUFBRSxVQUFDLEdBQUc7Z0JBRVQsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQTtnQkFFL0IsRUFBRSxDQUFDLFNBQVMsQ0FBQztvQkFDVCxLQUFLLEVBQUUsTUFBTTtvQkFDYixJQUFJLEVBQUUsU0FBUztpQkFDbEIsQ0FBQyxDQUFBO1lBQ04sQ0FBQztZQUNELElBQUksRUFBRTtnQkFDRixFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNULEtBQUssRUFBRSxNQUFNO29CQUNiLElBQUksRUFBRSxNQUFNO2lCQUNmLENBQUMsQ0FBQTtZQUNOLENBQUM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sS0FBSSxDQUFDLE9BQU8sQ0FBQztvQkFDVCxTQUFTLEVBQUUsS0FBSztpQkFDbkIsQ0FBQyxDQUFBO1lBQ04sQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQzthQUN0RCxJQUFJLENBQUMsY0FBTyxDQUFDLENBQUM7YUFDZCxLQUFLLENBQUMsVUFBQyxNQUFNO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFDSyxVQUFVLFlBQUMsUUFBZ0I7Ozs7OzRCQUNkLFdBQU0sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDMUQsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsbUJBQW1CO2dDQUNsRCxNQUFNLEVBQUUsS0FBSztnQ0FDYixJQUFJLEVBQUU7b0NBQ0YsUUFBUSxFQUFFLFFBQVE7aUNBQ3JCO2dDQUNELE9BQU8sRUFBRSxVQUFDLEVBQVE7d0NBQU4sY0FBSTtvQ0FDWixPQUFPLENBQWMsSUFBSSxDQUFDLENBQUE7Z0NBQzlCLENBQUM7Z0NBQ0QsSUFBSSxFQUFFLE1BQU07NkJBQ2YsQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFaRSxRQUFRLEdBQUcsU0FZYjt3QkFDRixJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUU7NEJBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsWUFBWSxFQUFFLFFBQVEsQ0FBQyxNQUFNOzZCQUNoQyxDQUFDLENBQUE7eUJBQ0w7NkJBQU07eUJBRU47Ozs7O0tBQ0o7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IHJlc291cmNlUmVzLCByZXNvdXJjZUl0ZW0gfSBmcm9tICcuLi8uLi91dGlscy9jb3Vyc2UvcmVzb3VyY2VSZXMnXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgbG9hZE1vZGFsOiBmYWxzZSxcclxuICAgICAgICAvLyByZXNvdXJjZUxpc3Q6W3tuYW1lOicxLuWHveaVsOWPiuWFtueJueaApy56aXAnLHVybDonJyxpc0Rvd25Mb2FkOmZhbHNlfSxcclxuICAgICAgICAvLyB7bmFtZTonMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJkuemlwJyx1cmw6JycsaXNEb3duTG9hZDpmYWxzZX0sXHJcbiAgICAgICAgLy8ge25hbWU6JzMu5Lik5Liq6YeN6KaB5p6B6ZmQLnppcCcsdXJsOiAnJyxpc0Rvd25Mb2FkOnRydWV9XVxyXG4gICAgICAgIHJlc291cmNlTGlzdDogPHJlc291cmNlSXRlbVtdPltdXHJcbiAgICB9LFxyXG4gICAgZG93bnRhcChldmVudDogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbG9hZE1vZGFsOiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB3eC5kb3dubG9hZEZpbGUoe1xyXG4gICAgICAgICAgICB1cmw6IHVybCxcclxuICAgICAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8g5Y+q6KaB5pyN5Yqh5Zmo5pyJ5ZON5bqU5pWw5o2u77yM5bCx5Lya5oqK5ZON5bqU5YaF5a655YaZ5YWl5paH5Lu25bm26L+b5YWlIHN1Y2Nlc3Mg5Zue6LCD77yM5Lia5Yqh6ZyA6KaB6Ieq6KGM5Yik5pat5piv5ZCm5LiL6L295Yiw5LqG5oOz6KaB55qE5YaF5a65XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsZVBhdGggPSByZXMudGVtcEZpbGVQYXRoXHJcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiDmlofku7blrZjlgqhcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkuIvovb3lrozmiJAnLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJ1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+S4i+i9veWksei0pScsXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkTW9kYWw6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5pbml0U291cmNlKHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5jb3Vyc2VJRClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgaW5pdFNvdXJjZShjb3Vyc2VJRDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlc291cmNlID0gYXdhaXQgbmV3IFByb21pc2U8cmVzb3VyY2VSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvcmVzb3VyY2VzJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cmVzb3VyY2VSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXNvdXJjZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICByZXNvdXJjZUxpc3Q6IHJlc291cmNlLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IOmUmeivr+WkhOeQhlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIl19