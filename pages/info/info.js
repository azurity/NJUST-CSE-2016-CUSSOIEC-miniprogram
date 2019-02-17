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
        personInfo: app.globalData.personInfo,
        reviseNickName: '',
        revisePhone: '',
        reviseEmail: '',
        reviseFlage: false,
        modalName: null
    },
    onLoad: function () { },
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
                                    college: app.globalData.personInfo.college,
                                    personID: app.globalData.personInfo.personID,
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
        this.postUserInfo()
            .then(function (value) {
            if (value) {
            }
            else {
            }
        })
            .catch(function (reason) {
            console.log(reason);
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsVUFBVztRQUN0QyxjQUFjLEVBQUUsRUFBRTtRQUNsQixXQUFXLEVBQUUsRUFBRTtRQUNmLFdBQVcsRUFBRSxFQUFFO1FBQ2YsV0FBVyxFQUFFLEtBQUs7UUFDbEIsU0FBUyxFQUFhLElBQUk7S0FDN0I7SUFDRCxNQUFNLGdCQUFJLENBQUM7SUFDWCxTQUFTLFlBQUMsQ0FBYztRQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsU0FBUyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU07WUFDekMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7WUFDN0MsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7WUFDdkMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7U0FDMUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELFNBQVMsWUFBQyxDQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUUsSUFBSTtTQUNsQixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsYUFBYSxZQUFDLENBQWdCO1FBQzFCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxjQUFjLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FB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QUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNsQixJQUFJLENBQUMsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNSLElBQUksS0FBSyxFQUFFO2FBRVY7aUJBQU07YUFFTjtRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFDLE1BQU07WUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgaW5mb1Bvc3RSZXMgfSBmcm9tICcuLi8uLi91dGlscy9pbmZvL2luZm9SZXMnXHJcblxyXG50eXBlIE1vZGFsTmFtZSA9ICdtZW51TW9kYWwnIHwgbnVsbFxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICAgICAgcGVyc29uSW5mbzogYXBwLmdsb2JhbERhdGEucGVyc29uSW5mbyEsXHJcbiAgICAgICAgcmV2aXNlTmlja05hbWU6ICcnLFxyXG4gICAgICAgIHJldmlzZVBob25lOiAnJyxcclxuICAgICAgICByZXZpc2VFbWFpbDogJycsXHJcbiAgICAgICAgcmV2aXNlRmxhZ2U6IGZhbHNlLFxyXG4gICAgICAgIG1vZGFsTmFtZTogPE1vZGFsTmFtZT5udWxsXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge30sXHJcbiAgICBzaG93TW9kYWwoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBtb2RhbE5hbWU6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldCxcclxuICAgICAgICAgICAgcmV2aXNlTmlja05hbWU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICByZXZpc2VQaG9uZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ucGhvbmUsXHJcbiAgICAgICAgICAgIHJldmlzZUVtYWlsOiB0aGlzLmRhdGEucGVyc29uSW5mby5lbWFpbFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgaGlkZU1vZGFsKF86IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbW9kYWxOYW1lOiBudWxsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBuaWNrTmFtZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICByZXZpc2VOaWNrTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHBob25lSW5wdXQoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHJldmlzZVBob25lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZW1haWxJbnB1dChlOiB3eC5JbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcmV2aXNlRW1haWw6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICByZXZpc2VkSW5mbygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBwZXJzb25JbmZvOiB7XHJcbiAgICAgICAgICAgICAgICB1c2VyVHlwZTogdGhpcy5kYXRhLnBlcnNvbkluZm8udXNlclR5cGUsXHJcbiAgICAgICAgICAgICAgICBjb2xsZWdlOiB0aGlzLmRhdGEucGVyc29uSW5mby5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgcGVyc29uSUQ6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgcmVhbE5hbWU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLnJlYWxOYW1lLFxyXG4gICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMuZGF0YS5yZXZpc2VOaWNrTmFtZSxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogdGhpcy5kYXRhLnBlcnNvbkluZm8uZ2VuZGVyLFxyXG4gICAgICAgICAgICAgICAgZ3JhZGU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmdyYWRlLFxyXG4gICAgICAgICAgICAgICAgYWNhZGVteTogdGhpcy5kYXRhLnBlcnNvbkluZm8uYWNhZGVteSxcclxuICAgICAgICAgICAgICAgIG1ham9yOiB0aGlzLmRhdGEucGVyc29uSW5mby5tYWpvcixcclxuICAgICAgICAgICAgICAgIHBob25lOiB0aGlzLmRhdGEucmV2aXNlUGhvbmUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogdGhpcy5kYXRhLnJldmlzZUVtYWlsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIC8qYXN5bmMgZ2V0UGVyb25JbmZvKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxpbmZvUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvdXNlci9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpbmZvUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHBlcnNvbkluZm86IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5yZWFzb24pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVycm9y5oqb5Ye65Yiw5aSW6Z2i77yM55SxY2F0Y2jlpITnkIZcclxuICAgIH0sKi9cclxuICAgIGFzeW5jIHBvc3RVc2VySW5mbygpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2U8aW5mb1Bvc3RSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy91c2VyL2luZm8nLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEucGVyc29uSW5mbyEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSW5mbyEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuaWNrTmFtZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lOiB0aGlzLmRhdGEucGVyc29uSW5mby5waG9uZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW1haWw6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmVtYWlsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGluZm9Qb3N0UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQuc3VjY2Vzc1xyXG4gICAgfSxcclxuICAgIHN1Ym1pdCgpIHtcclxuICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICB0aXRsZTogJ+S/ruaUueaIkOWKnycsXHJcbiAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcclxuICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIG1vZGFsTmFtZTogbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5yZXZpc2VkSW5mbygpXHJcbiAgICAgICAgdGhpcy5wb3N0VXNlckluZm8oKVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOaIkOWKn1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiDlpLHotKXvvIzmj5DnpLpcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuIl19