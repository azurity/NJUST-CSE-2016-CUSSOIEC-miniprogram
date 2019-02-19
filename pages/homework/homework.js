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
        homeworkList: [{
                name: '数字音频理论',
                homeworkID: '1234',
                isFinished: true
            }, {
                name: '数字视频信号处理',
                homeworkID: '12345',
                isFinished: false
            }],
        isInList: false,
        questionList: [{
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
                correctAnswer: '0',
                userAnswer: '1'
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
                correctAnswer: ['1', '2'],
                userAnswer: ['1', '2']
            }, {
                type: 1,
                question: '这是多选题2',
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
                correctAnswer: ['1', '2'],
                userAnswer: ['1', '2']
            }],
        answerList: [],
        userAnswer: [],
        questionNum: 0,
        listNum: 0
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
                                url: app.globalData.hostName + '/course/homework_list',
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
                                homeworkList: res.result.homeworkList
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    getQuestion: function () {
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
                                questionList: res.result
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
    entryCard: function (e) {
        this.setData({
            listNum: e.currentTarget.id
        });
        if (this.data.homeworkList[this.data.listNum].isFinished) {
            for (var i = 0; i < this.data.questionList.length; i++) {
                for (var j = 0; j < this.data.questionList[i].choseList.length; j++) {
                    if (isInArray(this.data.questionList[i].userAnswer, j.toString())) {
                        this.data.questionList[i].choseList[j].checked = 1;
                    }
                    else {
                        this.data.questionList[i].choseList[j].checked = 0;
                    }
                    if (isInArray(this.data.questionList[i].correctAnswer, j.toString())) {
                        this.data.questionList[i].choseList[j].checked = 2;
                    }
                    this.setData({
                        questionList: this.data.questionList
                    });
                }
            }
        }
        this.setData({
            isInList: true
        });
    },
    backCard: function () {
        this.setData({
            isInList: false
        });
        this.onLoad();
    },
    questionSteps: function () {
        console.log(this.data.questionList[this.data.questionNum].choseList[1].checked);
        var finished = this.data.homeworkList[this.data.listNum].isFinished;
        if (this.data.userAnswer.length == 0 && !finished) {
            wx.showToast({
                title: '请作答！',
                icon: 'none',
                duration: 2000
            });
        }
        else {
            if (arrayEqual(this
                .data.userAnswer, this.data.questionList[this.data.questionNum].correctAnswer)) {
                this.data.answerList.push({
                    indexNum: this.data.questionNum,
                    isCorrect: true,
                    userAnswer: this.data.userAnswer
                });
            }
            else {
                this.data.answerList.push({
                    indexNum: this.data.questionNum,
                    isCorrect: false,
                    userAnswer: this.data.userAnswer
                });
            }
            this.setData({
                answerList: this.data.answerList
            });
            console.log(this.data.answerList);
            if (this.data.questionNum < this.data.questionList.length - 1) {
                this.setData({
                    questionNum: this.data.questionNum + 1
                });
                this.setData({
                    userAnswer: []
                });
            }
            else {
                if (!finished) {
                }
                this.setData({
                    questionNum: 0
                });
                this.setData({
                    answerList: []
                });
                this.backCard();
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
function isInArray(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (value === array[i]) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxZQUFZLEVBQUUsQ0FBQztnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLElBQUk7YUFDbkIsRUFBRTtnQkFDQyxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUM7UUFDRixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FBSztxQkFDZCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxHQUFHO2dCQUNsQixVQUFVLEVBQUUsR0FBRzthQUNsQixFQUFFO2dCQUNDLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FB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SyxFQUFFO1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxLQUFLLENBQUE7U0FDbkI7YUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBaUIsRUFBRSxLQUFVO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQTtTQUNkO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBob21ld29ya1JlcywgYW5zd2VyUmVzLCBxdWVzdGlvblJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2hvbWV3b3JrL2hvbWV3b3JrUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGhvbWV3b3JrTGlzdDogW3tcclxuICAgICAgICAgICAgbmFtZTogJ+aVsOWtl+mfs+mikeeQhuiuuicsXHJcbiAgICAgICAgICAgIGhvbWV3b3JrSUQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgaXNGaW5pc2hlZDogdHJ1ZVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogJ+aVsOWtl+inhumikeS/oeWPt+WkhOeQhicsXHJcbiAgICAgICAgICAgIGhvbWV3b3JrSUQ6ICcxMjM0NScsXHJcbiAgICAgICAgICAgIGlzRmluaXNoZWQ6IGZhbHNlXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgaXNJbkxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIHF1ZXN0aW9uTGlzdDogW3tcclxuICAgICAgICAgICAgdHlwZTogMCxcclxuICAgICAgICAgICAgcXVlc3Rpb246ICfov5nmmK/ljZXpgInpopgnLFxyXG4gICAgICAgICAgICBpbWFnZVVSTDogJycsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuownXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnlm5snXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiAnMCcsXHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6ICcxJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgcXVlc3Rpb246ICfov5nmmK/lpJrpgInpopgnLFxyXG4gICAgICAgICAgICBpbWFnZVVSTDogJycsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuownXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnlm5snXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkupQnXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBbJzEnLCAnMiddLFxyXG4gICAgICAgICAgICB1c2VyQW5zd2VyOiBbJzEnLCAnMiddXHJcbiAgICAgICAgfSx7XHJcbiAgICAgICAgICAgIHR5cGU6IDEsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uOiAn6L+Z5piv5aSa6YCJ6aKYMicsXHJcbiAgICAgICAgICAgIGltYWdlVVJMOiAnJyxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4gCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS6jCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4iSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueWbmydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS6lCdcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IFsnMScsICcyJ10sXHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFsnMScsICcyJ11cclxuICAgICAgICB9XSxcclxuICAgICAgICBhbnN3ZXJMaXN0OiBbXSxcclxuICAgICAgICB1c2VyQW5zd2VyOiBbXSxcclxuICAgICAgICBxdWVzdGlvbk51bTogMCxcclxuICAgICAgICBsaXN0TnVtOiAwXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muWIl+ihqFxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldEhvbWV3b3JrKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxob21ld29ya1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29ya19saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LuOY291cnNlRGV0YWls5Lyg5p2l55qEY291cnNlSURcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxob21ld29ya1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBob21ld29ya0xpc3Q6IHJlcy5yZXN1bHQuaG9tZXdvcmtMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFF1ZXN0aW9uKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS7jmNvdXJzZURldGFpbOS8oOadpeeahGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZXdvcmtJRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW5pZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHF1ZXN0aW9uUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogcmVzLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwb3N0QW5zd2VyKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxhbnN3ZXJSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmtfYW5zd2VyJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5pZDogYXBwLmdsb2JhbERhdGEub3BlbmlkLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS7jmNvdXJzZURldGFpbOS8oOadpeeahGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZXdvcmtJRFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyOiB0aGlzLmRhdGEuYW5zd2VyTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxhbnN3ZXJSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBlbnRyeUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJror6bmg4VcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0luQXJyYXkodGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS51c2VyQW5zd2VyLCBqLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSW5BcnJheSh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNvcnJlY3RBbnN3ZXIsIGoudG9TdHJpbmcoKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiB0aGlzLmRhdGEucXVlc3Rpb25MaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpc0luTGlzdDogdHJ1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYmFja0NhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLm9uTG9hZCgpXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25TdGVwcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W3RoaXMuZGF0YS5xdWVzdGlvbk51bV0uY2hvc2VMaXN0WzFdLmNoZWNrZWQpXHJcbiAgICAgICAgbGV0IGZpbmlzaGVkOmJvb2xlYW4gPSB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS51c2VyQW5zd2VyLmxlbmd0aD09MCAmJiAhZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35L2c562U77yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5RXF1YWwodGhpc1xyXG4gICAgICAgICAgICAgICAgLmRhdGEudXNlckFuc3dlciwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNvcnJlY3RBbnN3ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hbnN3ZXJMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4TnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb3JyZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSArIDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWujOaIkO+8jOWPkemAgWFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd3gucGFnZVNjcm9sbFRvKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBjaGVja2JveENoYW5nZShlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrYm945Y+R55SfY2hhbmdl5LqL5Lu277yM5pC65bimdmFsdWXlgLzkuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICB1c2VyQW5zd2VyOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBhcnJheUVxdWFsKGFycmF5MTogQXJyYXk8YW55PiwgYXJyYXkyOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWFycmF5MilcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIGlmICghYXJyYXkxKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9IGFycmF5Mi5sZW5ndGgpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBhcnJheTEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGFycmF5MVtpXSBpbnN0YW5jZW9mIEFycmF5ICYmIGFycmF5MltpXSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGlmICghYXJyYXkxW2ldLmVxdWFscyhhcnJheTJbaV0pKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSBlbHNlIGlmIChhcnJheTFbaV0gIT0gYXJyYXkyW2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGlzSW5BcnJheShhcnJheTogQXJyYXk8YW55PiwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gYXJyYXlbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2VcclxufVxyXG4iXX0=