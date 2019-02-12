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
        },
        reviseNickName: '',
        revisePhone: '',
        reviseEmail: '',
        reviseFlage: false,
        modalName: null
    },
    onLoad: function () {
    },
    showModal: function (e) {
        this.setData({
            modalName: e.currentTarget.dataset.target,
            reviseNickName: this.data.personInfo.nickName,
            revisePhone: this.data.personInfo.phone,
            reviseEmail: this.data.personInfo.email
        });
    },
    hideModal: function (_) {
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
    revisedInfo: function () {
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
                                url: app.globalData.hostName + '/user/info',
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
        this.revisedInfo();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsVUFBVSxFQUFjO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLFFBQVE7WUFDakIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLFlBQVk7WUFDckIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsS0FBSyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNELGNBQWMsRUFBRSxFQUFFO1FBQ2xCLFdBQVcsRUFBRSxFQUFFO1FBQ2YsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXLEVBQUUsS0FBSztRQUNsQixTQUFTLEVBQWEsSUFBSTtLQUM3QjtJQUNELE1BQU07SUFFTixDQUFDO0lBQ0QsU0FBUyxZQUFDLENBQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQ3pDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRO1lBQzdDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUs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LENBQUMsVUFBVSxDQUFDLE9BQU87b0NBQy9CLFFBQVEsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVE7b0NBQ2pDLElBQUksRUFBRTt3Q0FDRixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTt3Q0FDdkMsS0FBSyxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7d0NBQ2pDLEtBQUssRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO3FDQUNwQztpQ0FDSjtnQ0FDRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFjLElBQUksQ0FBQyxDQUFBO2dDQUM5QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBbEJFLE1BQU0sR0FBRyxTQWtCWDt3QkFDRixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0NBQ1QsS0FBSyxFQUFFLE1BQU07Z0NBQ2IsSUFBSSxFQUFFLFNBQVM7Z0NBQ2YsUUFBUSxFQUFFLElBQUk7NkJBQ2pCLENBQUMsQ0FBQTt5QkFDTDt3QkFDRCxXQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUE7Ozs7S0FDeEI7SUFDRCxNQUFNO1FBQ0YsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNULEtBQUssRUFBRSxNQUFNO1lBQ2IsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUUsSUFBSTtTQUNqQixDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsU0FBUyxFQUFFLElBQUk7U0FDbEIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBa0J0QixDQUFDO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBQZXJzb25JbmZvLCBpbmZvUmVzLCBpbmZvUG9zdFJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2luZm8vaW5mb1JlcydcclxuXHJcbnR5cGUgTW9kYWxOYW1lID0gJ21lbnVNb2RhbCcgfCBudWxsXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICB1c2VySW5mbzoge30sXHJcbiAgICAgICAgaGFzVXNlckluZm86IGZhbHNlLFxyXG4gICAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKSxcclxuICAgICAgICBwZXJzb25JbmZvOiA8UGVyc29uSW5mbz57XHJcbiAgICAgICAgICAgIHVzZXJUeXBlOiAn5a2m55SfJyxcclxuICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwMTE3JyxcclxuICAgICAgICAgICAgcmVhbE5hbWU6ICfpmYjmuIXmiawnLFxyXG4gICAgICAgICAgICBuaWNrTmFtZTogJ3l1YW5tb3UnLFxyXG4gICAgICAgICAgICBnZW5kZXI6ICfnlLcnLFxyXG4gICAgICAgICAgICBncmFkZTogJ+acrOenkeS4ieW5tOe6pycsXHJcbiAgICAgICAgICAgIGFjYWRlbXk6ICforqHnrpfmnLrnp5HlrabkuI7lt6XnqIvlrabpmaInLFxyXG4gICAgICAgICAgICBtYWpvcjogJ+aZuuiDveenkeWtpuS4juaKgOacrycsXHJcbiAgICAgICAgICAgIHBob25lOiAnMTg4NTExOTg2MTInLFxyXG4gICAgICAgICAgICBlbWFpbDogJ3l1YW5tb3U4QGdtYWlsLmNvbSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJldmlzZU5pY2tOYW1lOiAnJyxcclxuICAgICAgICByZXZpc2VQaG9uZTogJycsXHJcbiAgICAgICAgcmV2aXNlRW1haWw6ICcnLFxyXG4gICAgICAgIHJldmlzZUZsYWdlOiBmYWxzZSxcclxuICAgICAgICBtb2RhbE5hbWU6IDxNb2RhbE5hbWU+bnVsbFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuXHJcbiAgICB9LFxyXG4gICAgc2hvd01vZGFsKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbW9kYWxOYW1lOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXQsXHJcbiAgICAgICAgICAgIHJldmlzZU5pY2tOYW1lOiB0aGlzLmRhdGEucGVyc29uSW5mby5uaWNrTmFtZSxcclxuICAgICAgICAgICAgcmV2aXNlUGhvbmU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnBob25lLFxyXG4gICAgICAgICAgICByZXZpc2VFbWFpbDogdGhpcy5kYXRhLnBlcnNvbkluZm8uZW1haWxcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGhpZGVNb2RhbChfOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIG1vZGFsTmFtZTogbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgbmlja05hbWVJbnB1dChlOiB3eC5JbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcmV2aXNlTmlja05hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBwaG9uZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICByZXZpc2VQaG9uZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGVtYWlsSW5wdXQoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHJldmlzZUVtYWlsOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcmV2aXNlZEluZm8oKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcGVyc29uSW5mbzoge1xyXG4gICAgICAgICAgICAgICAgdXNlclR5cGU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnVzZXJUeXBlLFxyXG4gICAgICAgICAgICAgICAgY29sbGVnZTogdGhpcy5kYXRhLnBlcnNvbkluZm8uY29sbGVnZSxcclxuICAgICAgICAgICAgICAgIHBlcnNvbklEOiB0aGlzLmRhdGEucGVyc29uSW5mby5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgIHJlYWxOYW1lOiB0aGlzLmRhdGEucGVyc29uSW5mby5yZWFsTmFtZSxcclxuICAgICAgICAgICAgICAgIG5pY2tOYW1lOiB0aGlzLmRhdGEucmV2aXNlTmlja05hbWUsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmdlbmRlcixcclxuICAgICAgICAgICAgICAgIGdyYWRlOiB0aGlzLmRhdGEucGVyc29uSW5mby5ncmFkZSxcclxuICAgICAgICAgICAgICAgIGFjYWRlbXk6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmFjYWRlbXksXHJcbiAgICAgICAgICAgICAgICBtYWpvcjogdGhpcy5kYXRhLnBlcnNvbkluZm8ubWFqb3IsXHJcbiAgICAgICAgICAgICAgICBwaG9uZTogdGhpcy5kYXRhLnJldmlzZVBob25lLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHRoaXMuZGF0YS5yZXZpc2VFbWFpbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRQZXJvbkluZm8oKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGluZm9SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy91c2VyL2luZm8nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHsgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGluZm9SZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcGVyc29uSW5mbzogcmVzLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzLnJlYXNvbilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZXJyb3Lmipvlh7rliLDlpJbpnaLvvIznlLFjYXRjaOWkhOeQhlxyXG4gICAgfSxcclxuICAgIGFzeW5jIHBvc3RVc2VySW5mbygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aW5mb1Bvc3RSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy91c2VyL2luZm8nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB0aGlzLmRhdGEucGVyc29uSW5mby5waG9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGluZm9Qb3N0UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQuc3VjY2Vzc1xyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+S/ruaUueaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIG1vZGFsTmFtZTogbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZXZpc2VkSW5mbygpXHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLnBvc3RVc2VySW5mbygpXHJcbiAgICAgICAgICAgIC50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl77yM5o+Q56S6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICovXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==