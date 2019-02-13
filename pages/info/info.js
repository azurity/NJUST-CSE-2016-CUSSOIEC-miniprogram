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
        this.getPeronInfo().catch(function (reason) {
            console.log(reason);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUtBLElBQU0sR0FBRyxHQUFHLE1BQU0sRUFBVSxDQUFBO0FBRTVCLElBQUksQ0FBQztJQUNELElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRSxFQUFFO1FBQ1osV0FBVyxFQUFFLEtBQUs7UUFDbEIsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUM7UUFDbkQsVUFBVSxFQUFjO1lBQ3BCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsT0FBTyxFQUFFLFFBQVE7WUFDakIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLEtBQUs7WUFDZixRQUFRLEVBQUUsU0FBUztZQUNuQixNQUFNLEVBQUUsR0FBRztZQUNYLEtBQUssRUFBRSxPQUFPO1lBQ2QsT0FBTyxFQUFFLFlBQVk7WUFDckIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsS0FBSyxFQUFFLGFBQWE7WUFDcEIsS0FBSyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNELGNBQWMsRUFBRSxFQUFFO1FBQ2xCLFdBQVcsRUFBRSxFQUFFO1FBQ2YsV0FBVyxFQUFFLEVBQUU7UUFDZixXQUFXLEVBQUUsS0FBSztRQUNsQixTQUFTLEVBQWEsSUFBSTtLQUM3QjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELFNBQVMsWUFBQyxDQUFjO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTTtZQUN6QyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTtZQUM3QyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztZQUN2QyxXQUFXLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztTQUMxQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsU0FBUyxZQUFDLENBQWM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxhQUFhLFlBQUMsQ0FBZ0I7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDakMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELFVBQVUsWUFBQyxDQUFnQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1QsV0FBVyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSztTQUM5QixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0QsVUFBVSxZQUFDLENBQWdCO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxXQUFXLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1NBQzlCLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFDRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFVBQVUsRUFBRTtnQkFDUixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU87Z0JBQ3JDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRO2dCQUN2QyxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUTtnQkFDdkMsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYztnQkFDbEMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU07Z0JBQ25DLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO2dCQUNqQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTztnQkFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUs7Z0JBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFDL0I7U0FDSixDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0ssWUFBWTs7Ozs7NEJBQ0osV0FBTSxJQUFJLE9BQU8sQ0FBVSxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNqRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyxZQUFZO2dDQUMzQyxNQUFNLEVBQUUsS0FBSztnQ0FDYixJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7Z0NBQ3ZDLE9BQU8sRUFBRSxVQUFDLEVBQVE7d0NBQU4sY0FBSTtvQ0FDWixPQUFPLENBQVUsSUFBSSxDQUFDLENBQUE7Z0NBQzFCLENBQUM7Z0NBQ0QsSUFBSSxFQUFFLE1BQU07NkJBQ2YsQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFWRSxHQUFHLEdBQUcsU0FVUjt3QkFDRixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVCxVQUFVLEVBQUUsR0FBRyxDQUFDLE1BQU07NkJBQ3pCLENBQUMsQ0FBQTt5QkFDTDs2QkFBTTt5QkFFTjs7Ozs7S0FFSjtJQUNLLFlBQVk7Ozs7Ozs0QkFDRCxXQUFNLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07NEJBQ3hELEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0NBQ1AsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLFlBQVk7Z0NBQzNDLE1BQU0sRUFBRSxNQUFNO2dDQUNkLElBQUksRUFBRTtvQ0FDRixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPO29DQUMvQixRQUFRLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRO29DQUNqQyxJQUFJLEVBQUU7d0NBQ0YsUUFBUSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7d0NBQ3ZDLEtBQUssRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLO3dDQUNqQyxLQUFLLEVBQUUsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztxQ0FDcEM7aUNBQ0o7Z0NBQ0QsT0FBTyxFQUFFLFVBQUMsRUFBUTt3Q0FBTixjQUFJO29DQUNaLE9BQU8sQ0FBYyxJQUFJLENBQUMsQ0FBQTtnQ0FDOUIsQ0FBQztnQ0FDRCxJQUFJLEVBQUUsTUFBTTs2QkFDZixDQUFDLENBQUE7d0JBQ04sQ0FBQyxDQUFDLEVBQUE7O3dCQWxCRSxNQUFNLEdBQUcsU0FrQlg7d0JBQ0YsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFOzRCQUNoQixFQUFFLENBQUMsU0FBUyxDQUFDO2dDQUNULEtBQUssRUFBRSxNQUFNO2dDQUNiLElBQUksRUFBRSxTQUFTO2dDQUNmLFFBQVEsRUFBRSxJQUFJOzZCQUNqQixDQUFDLENBQUE7eUJBQ0w7d0JBQ0QsV0FBTyxNQUFNLENBQUMsT0FBTyxFQUFBOzs7O0tBQ3hCO0lBQ0QsTUFBTTtRQUNGLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDVCxLQUFLLEVBQUUsTUFBTTtZQUNiLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFNBQVMsRUFBRSxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQWtCdEIsQ0FBQztDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgUGVyc29uSW5mbywgaW5mb1JlcywgaW5mb1Bvc3RSZXMgfSBmcm9tICcuLi8uLi91dGlscy9pbmZvL2luZm9SZXMnXHJcblxyXG50eXBlIE1vZGFsTmFtZSA9ICdtZW51TW9kYWwnIHwgbnVsbFxyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgdXNlckluZm86IHt9LFxyXG4gICAgICAgIGhhc1VzZXJJbmZvOiBmYWxzZSxcclxuICAgICAgICBjYW5JVXNlOiB3eC5jYW5JVXNlKCdidXR0b24ub3Blbi10eXBlLmdldFVzZXJJbmZvJyksXHJcbiAgICAgICAgcGVyc29uSW5mbzogPFBlcnNvbkluZm8+e1xyXG4gICAgICAgICAgICB1c2VyVHlwZTogJ+WtpueUnycsXHJcbiAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDExNycsXHJcbiAgICAgICAgICAgIHJlYWxOYW1lOiAn6ZmI5riF5omsJyxcclxuICAgICAgICAgICAgbmlja05hbWU6ICd5dWFubW91JyxcclxuICAgICAgICAgICAgZ2VuZGVyOiAn55S3JyxcclxuICAgICAgICAgICAgZ3JhZGU6ICfmnKznp5HkuInlubTnuqcnLFxyXG4gICAgICAgICAgICBhY2FkZW15OiAn6K6h566X5py656eR5a2m5LiO5bel56iL5a2m6ZmiJyxcclxuICAgICAgICAgICAgbWFqb3I6ICfmmbrog73np5HlrabkuI7mioDmnK8nLFxyXG4gICAgICAgICAgICBwaG9uZTogJzE4ODUxMTk4NjEyJyxcclxuICAgICAgICAgICAgZW1haWw6ICd5dWFubW91OEBnbWFpbC5jb20nXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXZpc2VOaWNrTmFtZTogJycsXHJcbiAgICAgICAgcmV2aXNlUGhvbmU6ICcnLFxyXG4gICAgICAgIHJldmlzZUVtYWlsOiAnJyxcclxuICAgICAgICByZXZpc2VGbGFnZTogZmFsc2UsXHJcbiAgICAgICAgbW9kYWxOYW1lOiA8TW9kYWxOYW1lPm51bGxcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgdGhpcy5nZXRQZXJvbkluZm8oKS5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHNob3dNb2RhbChlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIG1vZGFsTmFtZTogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0LFxyXG4gICAgICAgICAgICByZXZpc2VOaWNrTmFtZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ubmlja05hbWUsXHJcbiAgICAgICAgICAgIHJldmlzZVBob25lOiB0aGlzLmRhdGEucGVyc29uSW5mby5waG9uZSxcclxuICAgICAgICAgICAgcmV2aXNlRW1haWw6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmVtYWlsXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBoaWRlTW9kYWwoXzogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBtb2RhbE5hbWU6IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIG5pY2tOYW1lSW5wdXQoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHJldmlzZU5pY2tOYW1lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcGhvbmVJbnB1dChlOiB3eC5JbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcmV2aXNlUGhvbmU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlbWFpbElucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICByZXZpc2VFbWFpbDogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHJldmlzZWRJbmZvKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHBlcnNvbkluZm86IHtcclxuICAgICAgICAgICAgICAgIHVzZXJUeXBlOiB0aGlzLmRhdGEucGVyc29uSW5mby51c2VyVHlwZSxcclxuICAgICAgICAgICAgICAgIGNvbGxlZ2U6IHRoaXMuZGF0YS5wZXJzb25JbmZvLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICBwZXJzb25JRDogdGhpcy5kYXRhLnBlcnNvbkluZm8ucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICByZWFsTmFtZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ucmVhbE5hbWUsXHJcbiAgICAgICAgICAgICAgICBuaWNrTmFtZTogdGhpcy5kYXRhLnJldmlzZU5pY2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiB0aGlzLmRhdGEucGVyc29uSW5mby5nZW5kZXIsXHJcbiAgICAgICAgICAgICAgICBncmFkZTogdGhpcy5kYXRhLnBlcnNvbkluZm8uZ3JhZGUsXHJcbiAgICAgICAgICAgICAgICBhY2FkZW15OiB0aGlzLmRhdGEucGVyc29uSW5mby5hY2FkZW15LFxyXG4gICAgICAgICAgICAgICAgbWFqb3I6IHRoaXMuZGF0YS5wZXJzb25JbmZvLm1ham9yLFxyXG4gICAgICAgICAgICAgICAgcGhvbmU6IHRoaXMuZGF0YS5yZXZpc2VQaG9uZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmRhdGEucmV2aXNlRW1haWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0UGVyb25JbmZvKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxpbmZvUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvdXNlci9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7IG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpbmZvUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHBlcnNvbkluZm86IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5yZWFzb24pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGVycm9y5oqb5Ye65Yiw5aSW6Z2i77yM55SxY2F0Y2jlpITnkIZcclxuICAgIH0sXHJcbiAgICBhc3luYyBwb3N0VXNlckluZm8oKSB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlPGluZm9Qb3N0UmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvdXNlci9pbmZvJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmlja05hbWU6IHRoaXMuZGF0YS5wZXJzb25JbmZvLm5pY2tOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaG9uZTogdGhpcy5kYXRhLnBlcnNvbkluZm8ucGhvbmUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiB0aGlzLmRhdGEucGVyc29uSW5mby5lbWFpbFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxpbmZvUG9zdFJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlc3VsdC5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+S/ruaUueaIkOWKnycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0LnN1Y2Nlc3NcclxuICAgIH0sXHJcbiAgICBzdWJtaXQoKSB7XHJcbiAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgdGl0bGU6ICfkv67mlLnmiJDlip8nLFxyXG4gICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBtb2RhbE5hbWU6IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMucmV2aXNlZEluZm8oKVxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgdGhpcy5wb3N0VXNlckluZm8oKVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5L+u5pS55oiQ5YqfJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IOWksei0pe+8jOaPkOekulxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAqL1xyXG4gICAgfVxyXG59KVxyXG4iXX0=