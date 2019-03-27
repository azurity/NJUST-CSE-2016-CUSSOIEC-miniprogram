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
        loading: false,
        college: '',
        personID: '',
        realName: '',
        nickName: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () { },
    submit: function (defaultNickName) {
        var _this = this;
        if (this.data.college === '' || this.data.personID === '' || this.data.realName === '') {
            wx.showToast({ title: '请填写所有必填项', icon: 'none' });
            return;
        }
        this.setData({ loading: true });
        this.submitRequest(defaultNickName)
            .then(function (value) {
            if (value) {
                wx.switchTab({ url: '/pages/index/index' });
            }
            else {
                _this.setData({ loading: false });
            }
        })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    collegeInput: function (e) {
        this.setData({
            college: e.detail.value
        });
    },
    personIDInput: function (e) {
        this.setData({
            personID: e.detail.value
        });
    },
    realNameInput: function (e) {
        this.setData({
            realName: e.detail.value
        });
    },
    nickNameInput: function (e) {
        this.setData({
            nickName: e.detail.value
        });
    },
    userInfoSubmit: function () {
        var _this = this;
        wx.getUserInfo({
            success: function (res) {
                _this.submit(res.userInfo.nickName);
            },
            fail: function () {
                wx.showToast({ title: '请授权允许使用用户信息', icon: 'none' });
            }
        });
    },
    bindGetUserInfo: function (e) {
        if (!e.detail.userInfo) {
            wx.showToast({ title: '请授权允许使用用户信息', icon: 'none' });
        }
        else {
            this.submit(e.detail.userInfo.nickName);
        }
    },
    submitRequest: function (defaultNickName) {
        return __awaiter(this, void 0, void 0, function () {
            var result, info;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/user/binding',
                                method: 'POST',
                                data: {
                                    openid: app.globalData.openid,
                                    data: {
                                        college: _this.data.college,
                                        personID: _this.data.personID,
                                        realName: _this.data.realName,
                                        nickName: _this.data.nickName || defaultNickName
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
                        if (!result.success) {
                            return [2, false];
                        }
                        return [4, new Promise(function (resolve, reject) {
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
                    case 2:
                        info = _a.sent();
                        if (info.success) {
                            app.globalData.personInfo = info.result;
                        }
                        return [2, info.success];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUlELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO1FBQ1osUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztLQUN0RDtJQUtELE1BQU0sZ0JBQUksQ0FBQztJQUtYLE1BQU0sWUFBQyxlQUF1QjtRQUE5QixpQkFtQkM7UUFsQkcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNwRixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtZQUNqRCxPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7YUFDOUIsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNSLElBQUksS0FBSyxFQUFFO2dCQUVQLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFBO2FBQzlDO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxF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QU8sRUFBRSxNQUFNO2dDQUNsRCxFQUFFLENBQUMsT0FBTyxDQUFDO29DQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxZQUFZO29DQUMzQyxNQUFNLEVBQUUsS0FBSztvQ0FDYixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7b0NBQ3ZDLE9BQU8sRUFBRSxVQUFDLEVBQVE7NENBQU4sY0FBSTt3Q0FDWixPQUFPLENBQVUsSUFBSSxDQUFDLENBQUE7b0NBQzFCLENBQUM7b0NBQ0QsSUFBSSxFQUFFLE1BQU07aUNBQ2YsQ0FBQyxDQUFBOzRCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFWRSxJQUFJLEdBQUcsU0FVVDt3QkFDRixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7NEJBQ2QsR0FBRyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTt5QkFDMUM7d0JBQ0QsV0FBTyxJQUFJLENBQUMsT0FBTyxFQUFBOzs7O0tBQ3RCO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvYmluZGluZy9iaW5kaW5nLmpzXHJcbmltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgYmluZGluZ1JlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2dsb2JhbFJlcydcclxuaW1wb3J0IHsgaW5mb1JlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2luZm8vaW5mb1JlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgICAqL1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGNvbGxlZ2U6ICcnLFxyXG4gICAgICAgIHBlcnNvbklEOiAnJyxcclxuICAgICAgICByZWFsTmFtZTogJycsXHJcbiAgICAgICAgbmlja05hbWU6ICcnLFxyXG4gICAgICAgIGNhbklVc2U6IHd4LmNhbklVc2UoJ2J1dHRvbi5vcGVuLXR5cGUuZ2V0VXNlckluZm8nKVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHt9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+Q5Lqk6K+35rGCXHJcbiAgICAgKi9cclxuICAgIHN1Ym1pdChkZWZhdWx0Tmlja05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuY29sbGVnZSA9PT0gJycgfHwgdGhpcy5kYXRhLnBlcnNvbklEID09PSAnJyB8fCB0aGlzLmRhdGEucmVhbE5hbWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn6K+35aGr5YaZ5omA5pyJ5b+F5aGr6aG5JywgaWNvbjogJ25vbmUnIH0pXHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoeyBsb2FkaW5nOiB0cnVlIH0pXHJcbiAgICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KGRlZmF1bHROaWNrTmFtZSlcclxuICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDmiJDlip/vvIzot7PovaxcclxuICAgICAgICAgICAgICAgICAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvaW5kZXgvaW5kZXgnIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7IGxvYWRpbmc6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl77yM5o+Q56S6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbGxlZ2VJbnB1dChlOiB3eC5JbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY29sbGVnZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBwZXJzb25JRElucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwZXJzb25JRDogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZWFsTmFtZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICByZWFsTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBuaWNrTmFtZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBuaWNrTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB1c2VySW5mb1N1Ym1pdCgpIHtcclxuICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXM6IHd4LlVzZXJJbmZvUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0KHJlcy51c2VySW5mby5uaWNrTmFtZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfor7fmjojmnYPlhYHorrjkvb/nlKjnlKjmiLfkv6Hmga8nLCBpY29uOiAnbm9uZScgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGJpbmRHZXRVc2VySW5mbyhlOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWUuZGV0YWlsLnVzZXJJbmZvKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn6K+35o6I5p2D5YWB6K645L2/55So55So5oi35L+h5oGvJywgaWNvbjogJ25vbmUnIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdWJtaXQoZS5kZXRhaWwudXNlckluZm8ubmlja05hbWUpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBzdWJtaXRSZXF1ZXN0KGRlZmF1bHROaWNrTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPGJpbmRpbmdSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy91c2VyL2JpbmRpbmcnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiB0aGlzLmRhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IHRoaXMuZGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhbE5hbWU6IHRoaXMuZGF0YS5yZWFsTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMuZGF0YS5uaWNrTmFtZSB8fCBkZWZhdWx0Tmlja05hbWVcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8YmluZGluZ1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGluZm8gPSBhd2FpdCBuZXcgUHJvbWlzZTxpbmZvUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvdXNlci9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpbmZvUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAoaW5mby5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8gPSBpbmZvLnJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW5mby5zdWNjZXNzXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==