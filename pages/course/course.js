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
        loading: true,
        TabCur: 0,
        scrollLeft: 0,
        obj: [],
        scheduleDay: [],
        numOfWeek: 0,
        weekNum: ['一', '二', '三', '四', '五', '六', '日'],
        toggleDelay: false
    },
    tabSelect: function (e) {
        console.log(e);
        console.log(this.data.scheduleDay);
        this.setData({
            TabCur: e.currentTarget.dataset.id,
            scrollLeft: (e.currentTarget.dataset.id - 1) * 60
        });
        this.showCourses();
    },
    toggleDelay: function () {
        var that = this;
        this.setData({
            toggleDelay: true
        });
        setTimeout(function () {
            that.setData({
                toggleDelay: false
            });
        }, 1000);
    },
    onLoad: function () {
        var sch = [];
        sch.push({
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
        }, {
            courseID: 'qw124',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 0,
                    indexOfDay: [3, 4]
                }
            ],
            info: {
                name: '毛泽东思想与中国特色社会主义理论体系概论',
                teacher: '冯友兰·茅以升',
                location: 'IV-C108'
            }
        }, {
            courseID: 'qw125',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 1,
                    indexOfDay: [0, 1, 2]
                }
            ],
            info: {
                name: '计算机组成原理',
                teacher: '侯捷',
                location: 'I-205'
            }
        });
        var week = 2;
        this.setData({
            scheduleDay: sch,
            numOfWeek: week,
            loading: false
        });
        this.showCourses();
        this.toggleDelay();
    },
    showCourses: function () {
        var _this = this;
        this.setData({
            obj: this.data.scheduleDay
                .reduce(function (arr, item) {
                for (var _i = 0, _a = item.position; _i < _a.length; _i++) {
                    var pos = _a[_i];
                    if (pos.dayOfWeek == _this.data.TabCur) {
                        var result = JSON.parse(JSON.stringify(item));
                        result.position = [pos];
                        arr.push(result);
                    }
                }
                return arr;
            }, [])
                .filter(function (item) {
                for (var _i = 0, _a = item.position; _i < _a.length; _i++) {
                    var pos = _a[_i];
                    if (pos.dayOfWeek == _this.data.TabCur) {
                        return item.active.indexOf(_this.data.numOfWeek) != -1;
                    }
                }
                return false;
            })
        });
    },
    courseSchedule: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/courses',
                                method: 'POST',
                                data: {
                                    college: app.globalData.college,
                                    personID: app.globalData.personID
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        res = _a.sent();
                        if (res.success) {
                            this.setData({
                                scheduleDay: res.result,
                                loading: false
                            });
                        }
                        else {
                            this.setData({
                                loading: false
                            });
                        }
                        return [2, res.success];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQUU1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxDQUFDO1FBQ1QsVUFBVSxFQUFFLENBQUM7UUFDYixHQUFHLEVBQWdCLEVBQUU7UUFDckIsV0FBVyxFQUFnQixFQUFFO1FBQzdCLFNBQVMsRUFBRSxDQUFDO1FBQ1osT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQzVDLFdBQVcsRUFBRSxLQUFLO0tBQ3JCO0lBQ0QsU0FBUyxZQUFDLENBQWM7UUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsTUFBTSxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7U0FDcEQsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ3RCLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxXQUFXLEVBQUUsSUFBSTtTQUNwQixDQUFDLENBQUE7UUFDRixVQUFVLENBQUM7WUFDUCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFdBQVcsRUFBRSxLQUFLO2FBQ3JCLENBQUMsQ0FBQTtRQUNOLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNaLENBQUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO1FBQ1osR0FBRyxDQUFDLElBQUksQ0FDSjtZQUNJLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLFFBQVEsRUFBRTtnQkFDTjtvQkFDSSxTQUFTLEVBQUUsQ0FBQztvQkFDWixVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDeEI7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsU0FBUzthQUN0QjtTQUNKLEVBQ0Q7WUFDSSxRQUFRLEVBQUUsT0FBTztZQUNqQixNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQixRQUFRLEVBQUU7Z0JBQ047b0JBQ0ksU0FBUyxFQUFFLENBQUM7b0JBQ1osVUFBVSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDckI7YUFDSjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsc0JBQXNCO2dCQUM1QixPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLFNBQVM7YUFDdEI7U0FDSixFQUNEO1lBQ0ksUUFBUSxFQUFFLE9BQU87WUFDakIsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakIsUUFBUSxFQUFFO2dCQUNOO29CQUNJLFNBQVMsRUFBRSxDQUFDO29CQUNaLFVBQVUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QjthQUNKO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxPQUFPO2FBQ3BCO1NBQ0osQ0FDSixDQUFBO1FBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFBO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFdBQVcsRUFBRSxHQUFHO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsT0FBTyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQVd0QixDQUFDO0lBQ0QsV0FBVztRQUFYLGlCQXNCQztRQXJCRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVztpQkFDckIsTUFBTSxDQUFDLFVBQUMsR0FBaUIsRUFBRSxJQUFnQjtnQkFDeEMsS0FBZ0IsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYSxFQUFFO29CQUExQixJQUFJLEdBQUcsU0FBQTtvQkFDUixJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ25DLElBQUksTUFBTSxHQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO3dCQUN6RCxNQUFNLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7d0JBQ3ZCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7cUJBQ25CO2lCQUNKO2dCQUNELE9BQU8sR0FBRyxDQUFBO1lBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQztpQkFDTCxNQUFNLENBQUMsVUFBQyxJQUFnQjtnQkFDckIsS0FBZ0IsVUFBYSxFQUFiLEtBQUEsSUFBSSxDQUFDLFFBQVEsRUFBYixjQUFhLEVBQWIsSUFBYSxFQUFFO29CQUExQixJQUFJLEdBQUcsU0FBQTtvQkFDUixJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksS0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7d0JBQ25DLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtxQkFDeEQ7aUJBQ0o7Z0JBQ0QsT0FBTyxLQUFLLENBQUE7WUFDaEIsQ0FBQyxDQUFDO1NBQ1QsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNLLGNBQWM7Ozs7OzRCQUNOLFdBQU0sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDckQsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsaUJBQWlCO2dDQUNoRCxNQUFNLEVBQUUsTUFBTTtnQ0FDZCxJQUFJLEVBQUU7b0NBQ0YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTztvQ0FDL0IsUUFBUSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUTtpQ0FDcEM7Z0NBQ0QsT0FBTyxFQUFFLFVBQUMsRUFBUTt3Q0FBTixjQUFJO29DQUNaLE9BQU8sQ0FBYyxJQUFJLENBQUMsQ0FBQTtnQ0FDOUIsQ0FBQztnQ0FDRCxJQUFJLEVBQUUsTUFBTTs2QkFDZixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQWJFLEdBQUcsR0FBRyxTQWFSO3dCQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDYixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULFdBQVcsRUFBRSxHQUFHLENBQUMsTUFBTTtnQ0FDdkIsT0FBTyxFQUFFLEtBQUs7NkJBQ2pCLENBQUMsQ0FBQTt5QkFDTDs2QkFBTTs0QkFDSCxJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNULE9BQU8sRUFBRSxLQUFLOzZCQUNqQixDQUFDLENBQUE7eUJBRUw7d0JBQ0QsV0FBTyxHQUFHLENBQUMsT0FBTyxFQUFBOzs7O0tBQ3JCO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBDb3Vyc2VJdGVtLCBzY2hlZHVsZVJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2NvdXJzZS9jb3Vyc2VSZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBsb2FkaW5nOiB0cnVlLFxyXG4gICAgICAgIFRhYkN1cjogMCxcclxuICAgICAgICBzY3JvbGxMZWZ0OiAwLFxyXG4gICAgICAgIG9iajogPENvdXJzZUl0ZW1bXT5bXSxcclxuICAgICAgICBzY2hlZHVsZURheTogPENvdXJzZUl0ZW1bXT5bXSxcclxuICAgICAgICBudW1PZldlZWs6IDAsXHJcbiAgICAgICAgd2Vla051bTogWyfkuIAnLCAn5LqMJywgJ+S4iScsICflm5snLCAn5LqUJywgJ+WFrScsICfml6UnXSxcclxuICAgICAgICB0b2dnbGVEZWxheTogZmFsc2VcclxuICAgIH0sXHJcbiAgICB0YWJTZWxlY3QoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5zY2hlZHVsZURheSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBUYWJDdXI6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkLFxyXG4gICAgICAgICAgICBzY3JvbGxMZWZ0OiAoZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQgLSAxKSAqIDYwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNob3dDb3Vyc2VzKClcclxuICAgIH0sXHJcbiAgICB0b2dnbGVEZWxheSgpIHtcclxuICAgICAgICBjb25zdCB0aGF0ID0gdGhpc1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHRvZ2dsZURlbGF5OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGF0LnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgdG9nZ2xlRGVsYXk6IGZhbHNlXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSwgMTAwMClcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgbGV0IHNjaCA9IFtdXHJcbiAgICAgICAgc2NoLnB1c2goXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjMnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6ICfnpZblhrLkuYsnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnSUlJLTEwNSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgY291cnNlSUQ6ICdxdzEyNCcsXHJcbiAgICAgICAgICAgICAgICBhY3RpdmU6IFsyLCAzLCA0XSxcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXlPZldlZWs6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4T2ZEYXk6IFszLCA0XVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICBpbmZvOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ+avm+azveS4nOaAneaDs+S4juS4reWbveeJueiJsuekvuS8muS4u+S5ieeQhuiuuuS9k+ezu+amguiuuicsXHJcbiAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjogJ+WGr+WPi+WFsMK36IyF5Lul5Y2HJyxcclxuICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogJ0lWLUMxMDgnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAncXcxMjUnLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlOiBbMiwgMywgNF0sXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICforqHnrpfmnLrnu4TmiJDljp/nkIYnLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6ICfkvq/mjbcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiAnSS0yMDUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICAgICAgbGV0IHdlZWsgPSAyXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgc2NoZWR1bGVEYXk6IHNjaCxcclxuICAgICAgICAgICAgbnVtT2ZXZWVrOiB3ZWVrLFxyXG4gICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zaG93Q291cnNlcygpXHJcbiAgICAgICAgdGhpcy50b2dnbGVEZWxheSgpXHJcbiAgICAgICAgLypcclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5jb3Vyc2VTY2hlZHVsZSgpXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q291cnNlcygpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZURlbGF5KClcclxuICAgICAgICAgICAgICAgIC8vIFRPRE/mlbDmja7nu5HlrprliLB0aGlzXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pKi9cclxuICAgIH0sXHJcbiAgICBzaG93Q291cnNlcygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBvYmo6IHRoaXMuZGF0YS5zY2hlZHVsZURheVxyXG4gICAgICAgICAgICAgICAgLnJlZHVjZSgoYXJyOiBDb3Vyc2VJdGVtW10sIGl0ZW06IENvdXJzZUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBwb3Mgb2YgaXRlbS5wb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zLmRheU9mV2VlayA9PSB0aGlzLmRhdGEuVGFiQ3VyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBDb3Vyc2VJdGVtID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wb3NpdGlvbiA9IFtwb3NdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFyclxyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChpdGVtOiBDb3Vyc2VJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcG9zIG9mIGl0ZW0ucG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvcy5kYXlPZldlZWsgPT0gdGhpcy5kYXRhLlRhYkN1cikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uYWN0aXZlLmluZGV4T2YodGhpcy5kYXRhLm51bU9mV2VlaykgIT0gLTFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBjb3Vyc2VTY2hlZHVsZSgpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8c2NoZWR1bGVSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvY291cnNlcycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHNjaGVkdWxlUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHNjaGVkdWxlRGF5OiByZXMucmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcy5zdWNjZXNzXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==