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
        iconList: [
            {
                icon: 'emojifill',
                color: 'red',
                badge: 120,
                name: '考勤'
            },
            {
                icon: 'writefill',
                color: 'mauve',
                badge: 1,
                name: '试题作业'
            },
            {
                icon: 'selectionfill',
                color: 'cyan',
                badge: 0,
                name: '评教'
            },
            {
                icon: 'circlefill',
                color: 'olive',
                badge: 22,
                name: '配套资源'
            }
        ],
        lesson: {},
        isLiving: true,
        videoList: []
    },
    tapCourse: function (event) {
        var id = event.currentTarget.dataset.id;
        var name = event.currentTarget.dataset.name;
        var url = event.currentTarget.dataset.url;
        wx.setStorageSync("id", id);
        wx.setStorageSync("name", name);
        wx.setStorageSync("url", url);
        wx.navigateTo({ url: "/pages/video/video" });
    },
    onLoad: function (query) {
        var obj = {
            courseID: 'qw123',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 0,
                    indexOfDay: [0, 1, 2]
                }
            ],
            info: {
                name: '高等数学',
                teacher: '祖冲之',
                location: 'III-105'
            }
        };
        var videos = [
            {
                date: '2019-1-12',
                courses: [
                    {
                        id: 'v001',
                        name: '1.函数及其特性',
                        iswatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-13',
                courses: [
                    {
                        id: 'v002',
                        name: '2.极限的概念、性质和运算法则',
                        iswatch: true,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-14',
                courses: [
                    {
                        id: 'v003',
                        name: '3.两个重要极限',
                        iswatch: true,
                        url: ''
                    },
                    {
                        id: 'v004',
                        name: '4.极限存在准则',
                        iswatch: false,
                        url: ''
                    }
                ]
            },
            {
                date: '2019-1-15',
                courses: [
                    {
                        id: 'v005',
                        name: '5.无穷小量和无穷大量',
                        iswatch: false,
                        url: ''
                    }
                ]
            }
        ];
        this.setData({
            lesson: obj,
            videoList: videos
        });
    },
    init: function (courseID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2];
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixRQUFRLEVBQUU7WUFDTjtnQkFDSSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEtBQUssRUFBRSxNQUFNO2dCQUNiLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksRUFBRSxJQUFJO2FBQ2I7WUFDRDtnQkFDSSxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07YUFDZjtTQUNKO1FBQ0QsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsSUFBSTtRQUNkLFNBQVMsRUFBRSxFQUFFO0tBQ2hCO0lBRUQsU0FBUyxZQUFDLEtBQVM7UUFDZixJQUFJLEVBQUUsR0FBUSxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDN0MsSUFBSSxJQUFJLEdBQVEsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ2pELElBQUksR0FBRyxHQUFRLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUMvQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsR0FBRyxFQUFDLG9CQUFvQixFQUFDLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBS0QsTUFBTSxZQUFDLEtBQXlCO1FBQzVCLElBQUksR0FBRyxHQUFHO1lBQ04sUUFBUSxFQUFFLE9BQU87WUFDakIsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakIsUUFBUSxFQUFFO2dCQUNOO29CQUNJLFNBQVMsRUFBRSxDQUFDO29CQUNaLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxNQUFNO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRSxTQUFTO2FBQ3RCO1NBQ0osQ0FBQTtRQUNELElBQUksTUFBTSxHQUFHO1lBQ1Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxFQUFFLEVBQUUsTUFBTTt3QkFDVixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLEVBQUU7cUJBQ1Y7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksRUFBRSxFQUFFLE1BQU07d0JBQ1YsSUFBSSxFQUFFLGlCQUFpQjt3QkFDdkIsT0FBTyxFQUFFLElBQUk7d0JBQ2IsR0FBRyxFQUFFLEVBQUU7cUJBQ1Y7aUJBQ0o7YUFDSjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2dCQUNqQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksRUFBRSxFQUFFLE1BQU07d0JBQ1YsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxJQUFJO3dCQUNiLEdBQUcsRUFBRSxFQUFFO3FCQUNWO29CQUNEO3dCQUNJLEVBQUUsRUFBRSxNQUFNO3dCQUNWLElBQUksRUFBRSxVQUFVO3dCQUNoQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxHQUFHLEVBQUUsRUFBRTtxQkFDVjtpQkFDSjthQUNKO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE9BQU8sRUFBRTtvQkFDTDt3QkFDSSxFQUFFLEVBQUUsTUFBTTt3QkFDVixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsR0FBRyxFQUFFLEVBQUU7cUJBQ1Y7aUJBQ0o7YUFDSjtTQUNKLENBQUE7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsTUFBTSxFQUFFLEdBQUc7WUFDWCxTQUFTLEVBQUUsTUFBTTtTQUNwQixDQUFDLENBQUE7SUFZTixDQUFDO0lBRUssSUFBSSxZQUFDLFFBQWdCOzs7Ozs7S0FFMUI7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcblxyXG5pbnRlcmZhY2UgQ291cnNlRGV0YWlsUXVlcnkge1xyXG4gICAgY291cnNlSUQ/OiBzdHJpbmdcclxufVxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgaWNvbkxpc3Q6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2Vtb2ppZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JlZCcsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMTIwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+iAg+WLpCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3dyaXRlZmlsbCcsXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogJ21hdXZlJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAxLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+ivlemimOS9nOS4midcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3NlbGVjdGlvbmZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdjeWFuJyxcclxuICAgICAgICAgICAgICAgIGJhZGdlOiAwLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+ivhOaVmSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2NpcmNsZWZpbGwnLFxyXG4gICAgICAgICAgICAgICAgY29sb3I6ICdvbGl2ZScsXHJcbiAgICAgICAgICAgICAgICBiYWRnZTogMjIsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YWN5aWX6LWE5rqQJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXSxcclxuICAgICAgICBsZXNzb246IHt9LFxyXG4gICAgICAgIGlzTGl2aW5nOiB0cnVlLCAvL+aYr+WQpuato+WcqOebtOaSrVxyXG4gICAgICAgIHZpZGVvTGlzdDogW11cclxuICAgIH0sXHJcblxyXG4gICAgdGFwQ291cnNlKGV2ZW50OmFueSkge1xyXG4gICAgICAgIGxldCBpZDpzdHJpbmc9ZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkO1xyXG4gICAgICAgIGxldCBuYW1lOnN0cmluZz1ldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQubmFtZTtcclxuICAgICAgICBsZXQgdXJsOnN0cmluZz1ldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudXJsO1xyXG4gICAgICAgIHd4LnNldFN0b3JhZ2VTeW5jKFwiaWRcIixpZCk7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJuYW1lXCIsbmFtZSk7XHJcbiAgICAgICAgd3guc2V0U3RvcmFnZVN5bmMoXCJ1cmxcIix1cmwpO1xyXG4gICAgICAgIHd4Lm5hdmlnYXRlVG8oe3VybDpcIi9wYWdlcy92aWRlby92aWRlb1wifSlcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWKoOi9ve+8jOWcqOatpOWkhOWBmumcgOimgeWQjOatpeeahOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBvbkxvYWQocXVlcnk/OiBDb3Vyc2VEZXRhaWxRdWVyeSkge1xyXG4gICAgICAgIGxldCBvYmogPSB7XHJcbiAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjMnLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFsyLCAzLCA0XSxcclxuICAgICAgICAgICAgcG9zaXRpb246IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBkYXlPZldlZWs6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhPZkRheTogWzAsIDEsIDJdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGluZm86IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgICAgICAgdGVhY2hlcjogJ+elluWGsuS5iycsXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lJSS0xMDUnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHZpZGVvcyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogJzIwMTktMS0xMicsXHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3YwMDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMS7lh73mlbDlj4rlhbbnibnmgKcnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc3dhdGNoOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAnJ1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogJzIwMTktMS0xMycsXHJcbiAgICAgICAgICAgICAgICBjb3Vyc2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogJ3YwMDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnMi7mnoHpmZDnmoTmpoLlv7XjgIHmgKfotKjlkozov5Dnrpfms5XliJknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc3dhdGNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiAnMjAxOS0xLTE0JyxcclxuICAgICAgICAgICAgICAgIGNvdXJzZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAndjAwMycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICczLuS4pOS4qumHjeimgeaegemZkCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzd2F0Y2g6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICd2MDA0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzQu5p6B6ZmQ5a2Y5Zyo5YeG5YiZJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXN3YXRjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRhdGU6ICcyMDE5LTEtMTUnLFxyXG4gICAgICAgICAgICAgICAgY291cnNlczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6ICd2MDA1JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJzUu5peg56m35bCP6YeP5ZKM5peg56m35aSn6YePJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXN3YXRjaDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogJydcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbGVzc29uOiBvYmosXHJcbiAgICAgICAgICAgIHZpZGVvTGlzdDogdmlkZW9zXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvKmlmIChxdWVyeSA9PT0gdW5kZWZpbmVkIHx8IHF1ZXJ5LmNvdXJzZUlEID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5aSE55CG56Gu5a6e5Y+C5pWwXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5pbml0KHF1ZXJ5LmNvdXJzZUlEKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOWujOaIkOWIneWni+WMluWQjlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5Yid5aeL5YyW5Ye66ZSZ5aSE55CGXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH0qL1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBpbml0KGNvdXJzZUlEOiBzdHJpbmcpIHtcclxuICAgICAgICAvLyBUT0RPOiDliqDovb3or77nqIvor6bmg4XpobVcclxuICAgIH1cclxufSlcclxuIl19