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
            if (value.success) {
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
            var result;
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
                        return [2, result];
                }
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUlELElBQUksRUFBRTtRQUNGLE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsRUFBRTtRQUNaLFFBQVEsRUFBRSxFQUFFO1FBQ1osUUFBUSxFQUFFLEVBQUU7UUFDWixPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQztLQUN0RDtJQUtELE1BQU0sZ0JBQUksQ0FBQztJQUtYLE1BQU0sWUFBQyxlQUF1QjtRQUE5QixpQkFrQkM7UUFqQkcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNwRixFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtZQUNqRCxPQUFNO1NBQ1Q7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7YUFDOUIsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNSLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTthQUVsQjtpQkFBTTtnQkFDSCxLQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7YUFFbkM7UUFDTCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxNQUFNO1lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFFRCxZQUFZLFlBQUMsQ0FBZ0I7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULE9BQU8sRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDMUIsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGFBQWEsWUFBQyxDQUFnQjtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsUUFBUSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUMzQixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsYUFBYSxZQUFDLENBQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQzNCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhLFlBQUMsQ0FBZ0I7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFFBQVEsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDM0IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELGNBQWM7UUFBZCxpQkFTQztRQVJHLEVBQUUsQ0FBQyxXQUFXLENBQUM7WUFDWCxPQUFPLEVBQUUsVUFBQyxHQUF3QjtnQkFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3RDLENBQUM7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7WUFDeEQsQ0FBQztTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxlQUFlLFlBQUMsQ0FBTTtRQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDcEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7U0FDdkQ7YUFBTTtZQUNILElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7U0FDMUM7SUFDTCxDQUFDO0lBRUssYUFBYSxZQUFDLGVBQXVCOzs7Ozs7NEJBQzFCLFdBQU0sSUFBSSxPQUFPLENBQWEsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDdkQsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsZUFBZTtnQ0FDOUMsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsSUFBSSxFQUFFO29DQUNGLE1BQU0sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU07b0NBQzdCLElBQUksRUFBRTt3Q0FDRixPQUFPLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPO3dDQUMxQixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRO3dDQUM1QixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRO3dDQUM1QixRQUFRLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksZUFBZTtxQ0FDbEQ7aUNBQ0o7Z0NBQ0QsT0FBTyxFQUFFLFVBQUMsRUFBUTt3Q0FBTixjQUFJO29DQUNaLE9BQU8sQ0FBYSxJQUFJLENBQUMsQ0FBQTtnQ0FDN0IsQ0FBQztnQ0FDRCxJQUFJLEVBQUUsTUFBTTs2QkFDZixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQWxCRSxNQUFNLEdBQUcsU0FrQlg7d0JBQ0YsV0FBTyxNQUFNLEVBQUE7Ozs7S0FDaEI7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9iaW5kaW5nL2JpbmRpbmcuanNcclxuaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBiaW5kaW5nUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvZ2xvYmFsUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICAvKipcclxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICAgICAgY29sbGVnZTogJycsXHJcbiAgICAgICAgcGVyc29uSUQ6ICcnLFxyXG4gICAgICAgIHJlYWxOYW1lOiAnJyxcclxuICAgICAgICBuaWNrTmFtZTogJycsXHJcbiAgICAgICAgY2FuSVVzZTogd3guY2FuSVVzZSgnYnV0dG9uLm9wZW4tdHlwZS5nZXRVc2VySW5mbycpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cclxuICAgICAqL1xyXG4gICAgb25Mb2FkKCkge30sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmj5DkuqTor7fmsYJcclxuICAgICAqL1xyXG4gICAgc3VibWl0KGRlZmF1bHROaWNrTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5jb2xsZWdlID09PSAnJyB8fCB0aGlzLmRhdGEucGVyc29uSUQgPT09ICcnIHx8IHRoaXMuZGF0YS5yZWFsTmFtZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHsgdGl0bGU6ICfor7floavlhpnmiYDmnInlv4XloavpobknLCBpY29uOiAnbm9uZScgfSlcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7IGxvYWRpbmc6IHRydWUgfSlcclxuICAgICAgICB0aGlzLnN1Ym1pdFJlcXVlc3QoZGVmYXVsdE5pY2tOYW1lKVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5oiQ5Yqf77yM6Lez6L2sXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7IGxvYWRpbmc6IGZhbHNlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzog5aSx6LSl77yM5o+Q56S6XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIGNvbGxlZ2VJbnB1dChlOiB3eC5JbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY29sbGVnZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBwZXJzb25JRElucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwZXJzb25JRDogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICByZWFsTmFtZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICByZWFsTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBuaWNrTmFtZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBuaWNrTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICB1c2VySW5mb1N1Ym1pdCgpIHtcclxuICAgICAgICB3eC5nZXRVc2VySW5mbyh7XHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChyZXM6IHd4LlVzZXJJbmZvUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0KHJlcy51c2VySW5mby5uaWNrTmFtZSlcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZmFpbDogKCk9PntcclxuICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7IHRpdGxlOiAn6K+35o6I5p2D5YWB6K645L2/55So55So5oi35L+h5oGvJywgaWNvbjogJ25vbmUnIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICBiaW5kR2V0VXNlckluZm8oZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCFlLmRldGFpbC51c2VySW5mbykge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3QoeyB0aXRsZTogJ+ivt+aOiOadg+WFgeiuuOS9v+eUqOeUqOaIt+S/oeaBrycsIGljb246ICdub25lJyB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VibWl0KGUuZGV0YWlsLnVzZXJJbmZvLm5pY2tOYW1lKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYXN5bmMgc3VibWl0UmVxdWVzdChkZWZhdWx0Tmlja05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhd2FpdCBuZXcgUHJvbWlzZTxiaW5kaW5nUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvdXNlci9iaW5kaW5nJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogdGhpcy5kYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiB0aGlzLmRhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWxOYW1lOiB0aGlzLmRhdGEucmVhbE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5pY2tOYW1lOiB0aGlzLmRhdGEubmlja05hbWUgfHwgZGVmYXVsdE5pY2tOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGJpbmRpbmdSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXN1bHRcclxuICAgIH1cclxufSlcclxuIl19