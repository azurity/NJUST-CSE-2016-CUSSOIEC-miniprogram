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
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        personInfo: {},
        reviseNickName: '',
        revisePhone: '',
        reviseEmail: '',
        reviseFlage: false
    },
    onLoad: function () {
        var _this = this;
        this.setData({
            personInfo: {
                userType: '学生',
                college: '南京理工大学',
                personID: '916106840117',
                realName: '陈清扬',
                nickName: 'yuanmou',
                gender: '男',
                grade: '本科三年级',
                academy: '计算机科学与工程学院',
                major: '智能科学与技术',
                phone: '18851198612',
                email: 'yuanmou8@gmail.com'
            }
        });
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        }
        else if (this.data.canIUse) {
            app.userInfoReadyCallback = function (res) {
                _this.setData({
                    userInfo: res,
                    hasUserInfo: true
                });
            };
        }
        else {
            wx.getUserInfo({
                success: function (res) {
                    app.globalData.userInfo = res.userInfo;
                    _this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
    },
    getUserInfo: function (e) {
        console.log(e);
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    },
    showModal: function (e) {
        this.setData({
            modalName: e.currentTarget.dataset.target,
            reviseNickName: this.data.personInfo.nickName,
            revisePhone: this.data.personInfo.phone,
            reviseEmail: this.data.personInfo.email
        });
    },
    hideModal: function (e) {
        this.setData({
            modalName: null
        });
    },
    nickNameInput: function (e) {
        this.setData({
            reviseNickName: e.detail.value
        });
    },
    phoneInput: function (e) {
        this.setData({
            revisePhone: e.detail.value
        });
    },
    emailInput: function (e) {
        this.setData({
            reviseEmail: e.detail.value
        });
    },
    resivedInfo: function () {
        this.setData({
            personInfo: {
                userType: this.data.personInfo.userType,
                college: this.data.personInfo.college,
                personID: this.data.personInfo.personID,
                realName: this.data.personInfo.realName,
                nickName: this.data.reviseNickName,
                gender: this.data.personInfo.gender,
                grade: this.data.personInfo.grade,
                academy: this.data.personInfo.academy,
                major: this.data.personInfo.major,
                phone: this.data.revisePhone,
                email: this.data.reviseEmail
            }
        });
    },
    getPeronInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/user/info',
                                method: 'GET',
                                data: { openid: app.globalData.openid },
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
                                personInfo: res.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    postUserInfo: function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/global/binding',
                                method: 'POST',
                                data: {
                                    college: app.globalData.college,
                                    personID: app.globalData.personID,
                                    data: {
                                        nickName: _this.data.personInfo.nickName,
                                        phone: _this.data.personInfo.phone,
                                        email: _this.data.personInfo.email
                                    }
                                },
                                success: function (_a) {
                                    var data = _a.data;
                                    resolve(data);
                                },
                                fail: reject
                            });
                        })];
                    case 1:
                        result = _a.sent();
                        if (result.success) {
                            wx.showToast({
                                title: '修改成功',
                                icon: 'success',
                                duration: 2000
                            });
                        }
                        return [2, result.success];
                }
            });
        });
    },
    submit: function () {
        wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
        });
        this.setData({
            modalName: null
        });
        this.resivedInfo();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsVUFBVSxFQUFFLEVBQUU7UUFDZCxjQUFjLEVBQUUsRUFBRTtRQUNsQixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxFQUFFO1FBQ2YsV0FBVyxFQUFFLEtBQUs7S0FDckI7SUFDRCxNQUFNO1FBQU4saUJBMENDO1FBekNHLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFFBQVE7Z0JBQ2pCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUUsS0FBSztnQkFDZixRQUFRLEVBQUUsU0FBUztnQkFDbkIsTUFBTSxFQUFFLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsS0FBSyxFQUFFLG9CQUFvQjthQUM5QjtTQUNKLENBQUMsQ0FBQTtRQUNGLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQVEsQ0FBQztnQkFDVixRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUNqQyxXQUFXLEVBQUUsSUFBSTthQUNwQixDQUFDLENBQUE7U0FDTDthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFHMUIsR0FBRyxDQUFDLHFCQUFxQixHQUFHLFVBQUMsR0FBRztnQkFDNUIsS0FBSSxDQUFDLE9BQVEsQ0FBQztvQkFDVixRQUFRLEVBQUUsR0FBRztvQkFDYixXQUFXLEVBQUUsSUFBSTtpQkFDcEIsQ0FBQyxDQUFBO1lBQ04sQ0FBQyxDQUFBO1NBQ0o7YUFBTTtZQUVILEVBQUUsQ0FBQyxXQUFXLENBQUM7Z0JBQ1gsT0FBTyxFQUFFLFVBQUEsR0FBRztvQkFDUixHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFBO29CQUN0QyxLQUFJLENBQUMsT0FBUSxDQUFDO3dCQUNWLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTt3QkFDdEIsV0FBVyxFQUFFLElBQUk7cUJBQ3BCLENBQUMsQ0FBQTtnQkFDTixDQUFDO2FBQ0osQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBQ0QsV0FBVyxZQUFDLENBQU07UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxDQUFDLE9BQVEsQ0FBQztZQUNWLFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDM0IsV0FBVyxFQUFFLElBQUk7U0FDcEIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELFNBQVMsWUFBQyxDQUFDO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRO1lBQzdDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1NBQzFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxTQUFTLFlBQUMsQ0FBQztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsYUFBYSxZQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUNqQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsVUFBVSxZQUFDLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUM5QixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsVUFBVSxZQUFDLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUM5QixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsV0FBVztRQUNQLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQ3ZDLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPO2dCQUNyQyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDdkMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQ3ZDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7Z0JBQ2xDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2dCQUNuQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztnQkFDakMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87Z0JBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO2dCQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUM1QixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQy9CO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNLLFlBQVk7Ozs7OzRCQUNKLFdBQU0sSUFBSSxPQUFPLENBQVUsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDakQsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsWUFBWTtnQ0FDM0MsTUFBTSxFQUFFLEtBQUs7Z0NBQ2IsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dDQUN2QyxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFVLElBQUksQ0FBQyxDQUFBO2dDQUMxQixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBVkUsR0FBRyxHQUFHLFNBVVI7d0JBQ0YsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFOzRCQUNiLElBQUksQ0FBQyxPQUFPLENBQUM7Z0NBQ1QsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNOzZCQUN6QixDQUFDLENBQUE7eUJBQ0w7NkJBQU07eUJBRU47Ozs7O0tBRUo7SUFDSyxZQUFZOzs7Ozs7NEJBQ0QsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUN4RCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxpQkFBaUI7Z0NBQ2hELE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksRUFBRTtvQ0FDRixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPO29DQUMvQixRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO29DQUNqQyxJQUFJLEVBQUU7d0NBQ0YsUUFBUSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7d0NBQ3ZDLEtBQUssRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO3dDQUNqQyxLQUFLLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztxQ0FDcEM7aUNBQ0o7Z0NBQ0QsT0FBTyxFQUFFLFVBQUMsRUFBUTt3Q0FBTixjQUFJO29DQUNaLE9BQU8sQ0FBYyxJQUFJLENBQUMsQ0FBQTtnQ0FDOUIsQ0FBQztnQ0FDRCxJQUFJLEVBQUUsTUFBTTs2QkFDZixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQWxCRSxNQUFNLEdBQUcsU0FrQlg7d0JBQ0YsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOzRCQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNULEtBQUssRUFBRSxNQUFNO2dDQUNiLElBQUksRUFBRSxTQUFTO2dDQUNmLFFBQVEsRUFBRSxJQUFJOzZCQUNqQixDQUFDLENBQUE7eUJBQ0w7d0JBQ0QsV0FBTyxNQUFNLENBQUMsT0FBTyxFQUFBOzs7O0tBQ3hCO0lBQ0QsTUFBTTtRQUNGLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDVCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQWtCdEIsQ0FBQztDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgaW5mb1JlcywgaW5mb1Bvc3RSZXMgfSBmcm9tICcuLi8uLi91dGlscy9pbmZvL2luZm9SZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgICAgICBwZXJzb25JbmZvOiB7fSxcclxuICAgICAgICByZXZpc2VOaWNrTmFtZTogJycsXHJcbiAgICAgICAgcmV2aXNlUGhvbmU6ICcnLFxyXG4gICAgICAgIHJldmlzZUVtYWlsOiAnJyxcclxuICAgICAgICByZXZpc2VGbGFnZTogZmFsc2VcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcGVyc29uSW5mbzoge1xyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6ICflrabnlJ8nLFxyXG4gICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDExNycsXHJcbiAgICAgICAgICAgICAgICByZWFsTmFtZTogJ+mZiOa4heaJrCcsXHJcbiAgICAgICAgICAgICAgICBuaWNrTmFtZTogJ3l1YW5tb3UnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAn55S3JyxcclxuICAgICAgICAgICAgICAgIGdyYWRlOiAn5pys56eR5LiJ5bm057qnJyxcclxuICAgICAgICAgICAgICAgIGFjYWRlbXk6ICforqHnrpfmnLrnp5HlrabkuI7lt6XnqIvlrabpmaInLFxyXG4gICAgICAgICAgICAgICAgbWFqb3I6ICfmmbrog73np5HlrabkuI7mioDmnK8nLFxyXG4gICAgICAgICAgICAgICAgcGhvbmU6ICcxODg1MTE5ODYxMicsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogJ3l1YW5tb3U4QGdtYWlsLmNvbSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICAgICAgdXNlckluZm86IGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvLFxyXG4gICAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5jYW5JVXNlKSB7XHJcbiAgICAgICAgICAgIC8vIOeUseS6jiBnZXRVc2VySW5mbyDmmK/nvZHnu5zor7fmsYLvvIzlj6/og73kvJrlnKggUGFnZS5vbkxvYWQg5LmL5ZCO5omN6L+U5ZueXHJcbiAgICAgICAgICAgIC8vIOaJgOS7peatpOWkhOWKoOWFpSBjYWxsYmFjayDku6XpmLLmraLov5nnp43mg4XlhrVcclxuICAgICAgICAgICAgYXBwLnVzZXJJbmZvUmVhZHlDYWxsYmFjayA9IChyZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvOiByZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDlnKjmsqHmnIkgb3Blbi10eXBlPWdldFVzZXJJbmZvIOeJiOacrOeahOWFvOWuueWkhOeQhlxyXG4gICAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiByZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnVzZXJJbmZvID0gcmVzLnVzZXJJbmZvXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXJJbmZvOiByZXMudXNlckluZm8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1VzZXJJbmZvOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0VXNlckluZm8oZTogYW55KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICBhcHAuZ2xvYmFsRGF0YS51c2VySW5mbyA9IGUuZGV0YWlsLnVzZXJJbmZvXHJcbiAgICAgICAgdGhpcy5zZXREYXRhISh7XHJcbiAgICAgICAgICAgIHVzZXJJbmZvOiBlLmRldGFpbC51c2VySW5mbyxcclxuICAgICAgICAgICAgaGFzVXNlckluZm86IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNob3dNb2RhbChlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbW9kYWxOYW1lOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQsXHJcbiAgICAgICAgICAgIHJldmlzZU5pY2tOYW1lOiB0aGlzLmRhdGEucGVyc29uSW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgICAgcmV2aXNlUGhvbmU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnBob25lLFxyXG4gICAgICAgICAgICByZXZpc2VFbWFpbDogdGhpcy5kYXRhLnBlcnNvbkluZm8uZW1haWxcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGhpZGVNb2RhbChlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbW9kYWxOYW1lOiBudWxsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBuaWNrTmFtZUlucHV0KGUpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICByZXZpc2VOaWNrTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHBob25lSW5wdXQoZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHJldmlzZVBob25lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZW1haWxJbnB1dChlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcmV2aXNlRW1haWw6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZXNpdmVkSW5mbygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwZXJzb25JbmZvOiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyVHlwZTogdGhpcy5kYXRhLnBlcnNvbkluZm8udXNlclR5cGUsXHJcbiAgICAgICAgICAgICAgICBjb2xsZWdlOiB0aGlzLmRhdGEucGVyc29uSW5mby5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgcGVyc29uSUQ6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgcmVhbE5hbWU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnJlYWxOYW1lLFxyXG4gICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMuZGF0YS5yZXZpc2VOaWNrTmFtZSxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogdGhpcy5kYXRhLnBlcnNvbkluZm8uZ2VuZGVyLFxyXG4gICAgICAgICAgICAgICAgZ3JhZGU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmdyYWRlLFxyXG4gICAgICAgICAgICAgICAgYWNhZGVteTogdGhpcy5kYXRhLnBlcnNvbkluZm8uYWNhZGVteSxcclxuICAgICAgICAgICAgICAgIG1ham9yOiB0aGlzLmRhdGEucGVyc29uSW5mby5tYWpvcixcclxuICAgICAgICAgICAgICAgIHBob25lOiB0aGlzLmRhdGEucmV2aXNlUGhvbmUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdGhpcy5kYXRhLnJldmlzZUVtYWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFBlcm9uSW5mbygpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8aW5mb1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL3VzZXIvaW5mbycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogeyBvcGVuaWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5pZCB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aW5mb1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBwZXJzb25JbmZvOiByZXMucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMucmVhc29uKVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBlcnJvcuaKm+WHuuWIsOWklumdou+8jOeUsWNhdGNo5aSE55CGXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcG9zdFVzZXJJbmZvKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxpbmZvUG9zdFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2dsb2JhbC9iaW5kaW5nJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ucGhvbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmRhdGEucGVyc29uSW5mby5lbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpbmZvUG9zdFJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+S/ruaUueaIkOWKnycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0LnN1Y2Nlc3NcclxuICAgIH0sXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip8nLFxyXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBtb2RhbE5hbWU6IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMucmVzaXZlZEluZm8oKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5wb3N0VXNlckluZm8oKVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOWksei0pe+8jOaPkOekulxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG59KVxyXG4iXX0=