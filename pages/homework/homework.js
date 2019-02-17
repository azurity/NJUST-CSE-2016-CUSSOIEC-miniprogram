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
        basics: 0,
        numList: [{
                type: 0,
                question: '这是单选题',
                imageURL: '',
                choseList: [{
                        name: '选项一'
                    }, {
                        name: '选项二'
                    }, {
                        name: '选项三'
                    }, {
                        name: '选项四'
                    }],
                correctAnswer: '0'
            }, {
                type: 1,
                question: '这是多选题',
                imageURL: '',
                choseList: [{
                        name: '选项一'
                    }, {
                        name: '选项二'
                    }, {
                        name: '选项三'
                    }, {
                        name: '选项四'
                    }, {
                        name: '选项五'
                    }],
                correctAnswer: ['1', '2']
            }],
        answerList: [],
        userAnswer: null,
        num: 0
    },
    onLoad: function () {
    },
    getHomework: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/homework',
                                method: 'GET',
                                data: {},
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
                                numList: res.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    postAnswer: function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/homework_answer',
                                method: 'POST',
                                data: {
                                    openid: app.globalData.openid,
                                    data: {
                                        answer: _this.data.answerList
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
                        res = _a.sent();
                        return [2, res];
                }
            });
        });
    },
    numSteps: function () {
        if (this.data.num == this.data.numList.length - 1) {
        }
        if (!this.data.userAnswer) {
            wx.showToast({
                title: '请作答！',
                icon: 'none',
                duration: 2000
            });
        }
        else {
            if (arrayEqual(this
                .data.userAnswer, this.data.numList[this.data.num].correctAnswer)) {
                this.data.answerList.push({
                    indexNum: this.data.num,
                    isCorrect: true,
                    userAnswer: this.data.userAnswer
                });
            }
            else {
                this.data.answerList.push({
                    indexNum: this.data.num,
                    isCorrect: false,
                    userAnswer: this.data.userAnswer
                });
            }
            console.log(this.data.answerList);
            if (this.data.num < this.data.numList.length - 1) {
                this.setData({
                    num: this.data.num + 1
                });
            }
        }
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        this.setData({
            userAnswer: e.detail.value
        });
    }
});
function arrayEqual(array1, array2) {
    if (!array2)
        return false;
    if (!array1)
        return false;
    if (array1.length != array2.length)
        return false;
    for (var i = 0, l = array1.length; i < l; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            if (!array1[i].equals(array2[i]))
                return false;
        }
        else if (array1[i] != array2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxPQUFPLEVBQUUsQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxRQUFRLEVBQUUsT0FBTztnQkFDakIsUUFBUSxFQUFFLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLENBQUM7d0JBQ1IsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsQ0FBQztnQkFDRixhQUFhLEVBQUUsR0FBRzthQUNyQixFQUFFO2dCQUNDLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLENBQUM7Z0JBQ0YsYUFBYSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzthQUM1QixDQUFDO1FBQ0YsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsSUFBSTtRQUNoQixHQUFHLEVBQUUsQ0FBQztLQUNUO0lBQ0QsTUFBTTtJQUVOLENBQUM7SUFDSyxXQUFXOzs7Ozs0QkFDSCxXQUFNLElBQUks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Q0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMvQixPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IGhvbWV3b3JrUmVzLCBhbnN3ZXJSZXMgfSBmcm9tICcuLi8uLi91dGlscy9ob21ld29yay9ob21ld29ya1JlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGJhc2ljczogMCxcclxuICAgICAgICBudW1MaXN0OiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAwLFxyXG4gICAgICAgICAgICBxdWVzdGlvbjogJ+i/meaYr+WNlemAiemimCcsXHJcbiAgICAgICAgICAgIGltYWdlVVJMOiAnJyxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4gCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS6jCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4iSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueWbmydcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6ICcwJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgcXVlc3Rpb246ICfov5nmmK/lpJrpgInpopgnLFxyXG4gICAgICAgICAgICBpbWFnZVVSTDogJycsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuownXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnlm5snXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkupQnXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBbJzEnLCAnMiddXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgYW5zd2VyTGlzdDogW10sXHJcbiAgICAgICAgdXNlckFuc3dlcjogbnVsbCxcclxuICAgICAgICBudW06IDBcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia5pWw5o2uXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0SG9tZXdvcmsoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGhvbWV3b3JrUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LuOY291cnNlRGV0YWls5Lyg5p2l55qEY291cnNlSURcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxob21ld29ya1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBudW1MaXN0OiByZXMucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHBvc3RBbnN3ZXIoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGFuc3dlclJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29ya19hbnN3ZXInLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbmlkOiBhcHAuZ2xvYmFsRGF0YS5vcGVuaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LuOY291cnNlRGV0YWls5Lyg5p2l55qEY291cnNlSURcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8YW5zd2VyUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgbnVtU3RlcHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5udW0gPT0gdGhpcy5kYXRhLm51bUxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAvLyDmj5DnpLrplJnpopjmg4XlhrVcclxuICAgICAgICAgICAgLy8g5a6M5oiQ5L2c5Lia5o+Q5LqkXHJcbiAgICAgICAgICAgIC8vIOmhtemdoui3s+i9rOi/lOWbnlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuZGF0YS51c2VyQW5zd2VyKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+S9nOetlO+8gScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheUVxdWFsKHRoaXNcclxuICAgICAgICAgICAgICAgIC5kYXRhLnVzZXJBbnN3ZXIsIHRoaXMuZGF0YS5udW1MaXN0W3RoaXMuZGF0YS5udW1dLmNvcnJlY3RBbnN3ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLm51bSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLm51bSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IHRoaXMuZGF0YS51c2VyQW5zd2VyXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLm51bSA8IHRoaXMuZGF0YS5udW1MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbnVtOiB0aGlzLmRhdGEubnVtICsgMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3eC5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIGFycmF5RXF1YWwoYXJyYXkxOiBBcnJheTxhbnk+LCBhcnJheTI6IEFycmF5PGFueT4pOiBib29sZWFuIHtcclxuICAgIGlmICghYXJyYXkyKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKCFhcnJheTEpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgaWYgKGFycmF5MS5sZW5ndGggIT0gYXJyYXkyLmxlbmd0aClcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGFycmF5MS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBpZiAoYXJyYXkxW2ldIGluc3RhbmNlb2YgQXJyYXkgJiYgYXJyYXkyW2ldIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgaWYgKCFhcnJheTFbaV0uZXF1YWxzKGFycmF5MltpXSkpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9IGVsc2UgaWYgKGFycmF5MVtpXSAhPSBhcnJheTJbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG4iXX0=