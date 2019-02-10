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
        studentID: '',
        realName: '',
        nickName: ''
    },
    onLoad: function () { },
    submit: function () {
        var _this = this;
        if (this.data.college === '' || this.data.studentID === '' || this.data.realName === '') {
            return;
        }
        this.setData({ loading: true });
        this.submitRequest()
            .then(function (value) {
            if (value) {
            }
            else {
                _this.setData({ loading: false });
            }
        })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    input: function (inputType) {
        var _this = this;
        return function (e) {
            var _a;
            _this.setData((_a = {},
                _a[inputType] = e.detail.value,
                _a));
        };
    },
    submitRequest: function () {
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
                                    openid: app.globalData.openid,
                                    data: {
                                        college: _this.data.college,
                                        studentID: _this.data.studentID,
                                        realName: _this.data.realName,
                                        nickName: _this.data.nickName
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
                            app.globalData.studentID = result.result;
                        }
                        return [2, result.success];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBSTVCLElBQUksQ0FBQztJQUlELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUUsRUFBRTtRQUNiLFFBQVEsRUFBRSxFQUFFO1FBQ1osUUFBUSxFQUFFLEVBQUU7S0FDZjtJQUtELE1BQU0sZ0JBQUksQ0FBQztJQUtYLE1BQU07UUFBTixpQkFrQkM7UUFqQkcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUVyRixPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNmLElBQUksQ0FBQyxVQUFDLEtBQUs7WUFDUixJQUFJLEtBQUssRUFBRTthQUVWO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTthQUVuQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQUVELEtBQUssWUFBQyxTQUFvQjtRQUExQixpQkFNQztRQUxHLE9BQU8sVUFBQyxDQUFnQjs7WUFDcEIsS0FBSSxDQUFDLE9BQU87Z0JBQ1IsR0FBQyxTQUFTLElBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO29CQUM3QixDQUFBO1FBQ04sQ0FBQyxDQUFBO0lBQ0wsQ0FBQztJQUVLLGFBQWE7Ozs7Ozs0QkFDRixXQUFNLElBQUksT0FBTyxDQUFhLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQ3ZELEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLGlCQUFpQjtnQ0FDaEQsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsSUFBSSxFQUFFO29DQUNGLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0NBQzdCLElBQUksRUFBRTt3Q0FDRixPQUFPLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPO3dDQUMxQixTQUFTLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTO3dDQUM5QixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRO3dDQUM1QixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRO3FDQUMvQjtpQ0FDSjtnQ0FDRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFhLElBQUksQ0FBQyxDQUFBO2dDQUM3QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBbEJFLE1BQU0sR0FBRyxTQWtCWDt3QkFDRixJQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQUU7NEJBQ2hCLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7eUJBQzNDO3dCQUNELFdBQU8sTUFBTSxDQUFDLE9BQU8sRUFBQTs7OztLQUN4QjtDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2JpbmRpbmcvYmluZGluZy5qc1xyXG5pbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IGJpbmRpbmdSZXMgfSBmcm9tICcuLi8uLi91dGlscy9nbG9iYWxSZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG50eXBlIElucHV0VHlwZSA9ICdjb2xsZWdlJyB8ICdzdHVkZW50SUQnIHwgJ3JlYWxOYW1lJyB8ICduaWNrTmFtZSdcclxuXHJcblBhZ2Uoe1xyXG4gICAgLyoqXHJcbiAgICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cclxuICAgICAqL1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgICAgIGNvbGxlZ2U6ICcnLFxyXG4gICAgICAgIHN0dWRlbnRJRDogJycsXHJcbiAgICAgICAgcmVhbE5hbWU6ICcnLFxyXG4gICAgICAgIG5pY2tOYW1lOiAnJ1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICAgKi9cclxuICAgIG9uTG9hZCgpIHt9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5o+Q5Lqk6K+35rGCXHJcbiAgICAgKi9cclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmNvbGxlZ2UgPT09ICcnIHx8IHRoaXMuZGF0YS5zdHVkZW50SUQgPT09ICcnIHx8IHRoaXMuZGF0YS5yZWFsTmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgLy8gVE9ETzog5L+h5oGv5LiN5a6M5pW05o+Q56S6XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoeyBsb2FkaW5nOiB0cnVlIH0pXHJcbiAgICAgICAgdGhpcy5zdWJtaXRSZXF1ZXN0KClcclxuICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDmiJDlip/vvIzot7PovaxcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHsgbG9hZGluZzogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXvvIzmj5DnpLpcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXQoaW5wdXRUeXBlOiBJbnB1dFR5cGUpIHtcclxuICAgICAgICByZXR1cm4gKGU6IHd4LklucHV0RXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIFtpbnB1dFR5cGVdOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgc3VibWl0UmVxdWVzdCgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8YmluZGluZ1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2dsb2JhbC9iaW5kaW5nJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogdGhpcy5kYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0dWRlbnRJRDogdGhpcy5kYXRhLnN0dWRlbnRJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhbE5hbWU6IHRoaXMuZGF0YS5yZWFsTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMuZGF0YS5uaWNrTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxiaW5kaW5nUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgYXBwLmdsb2JhbERhdGEuc3R1ZGVudElEID0gcmVzdWx0LnJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0LnN1Y2Nlc3NcclxuICAgIH1cclxufSlcclxuIl19