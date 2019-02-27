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
        isInList: false,
        answerList: [],
        userAnswer: [],
        questionNum: 0,
        listNum: 0
    },
    onLoad: function () {
        Promise.all([this.getHomework()]);
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
                                data: {
                                    courseID: '3',
                                    personID: '916106840407',
                                    college: '南京理工大学'
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
                                homeworkList: res.result
                            });
                        }
                        else {
                        }
                        return [2];
                }
            });
        });
    },
    getQuestion: function (homework_id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/homework',
                                method: 'GET',
                                data: {
                                    courseID: '3',
                                    personID: '916106840407',
                                    college: '南京理工大学',
                                    homeworkID: '9'
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
    postAnswer: function (homework_id) {
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
                                    courseID: '3',
                                    personID: '916106840407',
                                    college: '南京理工大学',
                                    homeworkID: '9',
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
        var _this = this;
        this.setData({
            listNum: e.currentTarget.id
        });
        Promise.all([this.getQuestion(this.data.homeworkList[this.data.listNum].homeworkID)])
            .then(function () {
            _this.setData({
                questionList: _this.data.questionList.sort(function (a, b) {
                    return parseInt(a.questionIndex) - parseInt(b.questionIndex);
                })
            });
            for (var n = 0; n < _this.data.questionList.length; n++) {
                _this.data.questionList[n].choseList = _this.data.questionList[n].choseList.sort(function (a, b) {
                    return parseInt(a.choseIndex) - parseInt(b.choseIndex);
                });
                _this.setData({
                    questionList: _this.data.questionList
                });
            }
            if (_this.data.homeworkList[_this.data.listNum].isFinished) {
                for (var i = 0; i < _this.data.questionList.length; i++) {
                    for (var j = 0; j < _this.data.questionList[i].choseList.length; j++) {
                        if (_this.data.questionList[i].userAnswer.indexOf(j.toString()) >= 0) {
                            _this.data.questionList[i].choseList[j].checked = 1;
                        }
                        else {
                            _this.data.questionList[i].choseList[j].checked = 0;
                        }
                        if (_this.data.questionList[i].correctAnswer.indexOf(j.toString()) >= 0) {
                            _this.data.questionList[i].choseList[j].checked = 2;
                        }
                        _this.setData({
                            questionList: _this.data.questionList
                        });
                    }
                }
            }
            _this.setData({
                isInList: true
            });
        })
            .catch();
    },
    backCard: function () {
        this.setData({
            isInList: false
        });
        Promise.all([this.getHomework()]);
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
                    Promise.all([this.postAnswer(this.data.homeworkList[this.data.listNum].homeworkID)])
                        .then(function (reason) {
                        console.log(reason);
                    }).catch(function (reason) {
                        console.log(reason);
                    });
                    this.data.homeworkList[this.data.listNum].isFinished = true;
                    this.setData({
                        homeworkList: this.data.homeworkList
                    });
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
        var value = e.detail.value;
        if (this.data.questionList[this.data.questionNum].type == 0) {
            value = [e.detail.value];
        }
        this.setData({
            userAnswer: value
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
    var tempArr1 = array1.sort();
    var tempArr2 = array2.sort();
    console.log(tempArr1, tempArr2);
    for (var i = 0; i < tempArr1.length; i++) {
        if (tempArr1[i] != tempArr2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFjNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxFQUFFO1FBQ2QsVUFBVSxFQUFFLEVBQUU7UUFDZCxXQUFXLEVBQUUsQ0FBQztRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNLLFdBQVc7Ozs7OzRCQUNILFdBQU0sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDckQsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsdUJBQXVCO2dDQUN0RCxNQUFNLEVBQUUsS0FBSztnQ0FDYixJQUFJLEVBQUU7b0NBSUYsUUFBUSxFQUFFLEdBQUc7b0NBQ2IsUUFBUSxFQUFFLGNBQWM7b0NBQ3hCLE9BQU8sRUFBRSxRQUFRO2lDQUNwQjtnQ0FDRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFjLElBQUksQ0FBQyxDQUFBO2dDQUM5QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBakJFLEdBQUcsR0FBRyxTQWlCUjt3QkFDRixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVCxZQUFZLEVBQUUsR0FB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QUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBob21ld29ya1JlcywgYW5zd2VyUmVzLCBxdWVzdGlvblJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2hvbWV3b3JrL2hvbWV3b3JrUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuaW50ZXJmYWNlIHF1ZXN0aW9uSSB7XHJcbiAgICBxdWVzdGlvbkluZGV4OiBzdHJpbmdcclxufVxyXG5cclxudHlwZSBxdWVzdGlvbiA9IHF1ZXN0aW9uSVxyXG5cclxuaW50ZXJmYWNlIGNob3NlSSB7XHJcbiAgICBjaG9zZUluZGV4OiBzdHJpbmdcclxufVxyXG5cclxudHlwZSBjaG9zZSA9IGNob3NlSVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGlzSW5MaXN0OiBmYWxzZSxcclxuICAgICAgICBhbnN3ZXJMaXN0OiBbXSxcclxuICAgICAgICB1c2VyQW5zd2VyOiBbXSxcclxuICAgICAgICBxdWVzdGlvbk51bTogMCxcclxuICAgICAgICBsaXN0TnVtOiAwXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muWIl+ihqFxyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldEhvbWV3b3JrKCldKVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldEhvbWV3b3JrKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxob21ld29ya1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29ya19saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxob21ld29ya1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBob21ld29ya0xpc3Q6IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0UXVlc3Rpb24oaG9tZXdvcmtfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdXJzZUlEOiB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJykuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBob21ld29ya0lEOiBob21ld29ya19pZFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYxMDY4NDA0MDcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6ICc5J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHF1ZXN0aW9uUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogcmVzLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwb3N0QW5zd2VyKGhvbWV3b3JrX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8YW5zd2VyUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ2NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZXdvcmtJRDogaG9tZXdvcmtfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogJzknLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyOiB0aGlzLmRhdGEuYW5zd2VyTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxhbnN3ZXJSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBlbnRyeUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muivpuaDhVxyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldFF1ZXN0aW9uKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmhvbWV3b3JrSUQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5zb3J0KGZ1bmN0aW9uKGE6IHF1ZXN0aW9uLCBiOiBxdWVzdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEucXVlc3Rpb25JbmRleCkgLSBwYXJzZUludChiLnF1ZXN0aW9uSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3QubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtuXS5jaG9zZUxpc3QgPSB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W25dLmNob3NlTGlzdC5zb3J0KGZ1bmN0aW9uKGE6IGNob3NlLCBiOiBjaG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuY2hvc2VJbmRleCkgLSBwYXJzZUludChiLmNob3NlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0udXNlckFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNvcnJlY3RBbnN3ZXIuaW5kZXhPZihqLnRvU3RyaW5nKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiB0aGlzLmRhdGEucXVlc3Rpb25MaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luTGlzdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmNhdGNoKClcclxuICAgIH0sXHJcbiAgICBiYWNrQ2FyZCgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpc0luTGlzdDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldEhvbWV3b3JrKCldKVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uU3RlcHMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNob3NlTGlzdFsxXS5jaGVja2VkKVxyXG4gICAgICAgIGxldCBmaW5pc2hlZDogYm9vbGVhbiA9IHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWRcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnVzZXJBbnN3ZXIubGVuZ3RoID09IDAgJiYgIWZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+S9nOetlO+8gScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheUVxdWFsKHRoaXNcclxuICAgICAgICAgICAgICAgIC5kYXRhLnVzZXJBbnN3ZXIsIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS5jb3JyZWN0QW5zd2VyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmFuc3dlckxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhOdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTnVtIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0gKyAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiBbXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlrozmiJDvvIzlj5HpgIFhbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMucG9zdEFuc3dlcih0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5ob21ld29ya0lEKV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrTGlzdDogdGhpcy5kYXRhLmhvbWV3b3JrTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJMaXN0OiBbXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2hlY2tib3hDaGFuZ2UoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja2JveOWPkeeUn2NoYW5nZeS6i+S7tu+8jOaQuuW4pnZhbHVl5YC85Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgbGV0IHZhbHVlID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLnR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtlLmRldGFpbC52YWx1ZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXNlckFuc3dlcjogdmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gYXJyYXlFcXVhbChhcnJheTE6IHN0cmluZ1tdLCBhcnJheTI6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWFycmF5MilcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIGlmICghYXJyYXkxKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9IGFycmF5Mi5sZW5ndGgpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgbGV0IHRlbXBBcnIxID0gYXJyYXkxLnNvcnQoKVxyXG4gICAgbGV0IHRlbXBBcnIyID0gYXJyYXkyLnNvcnQoKVxyXG4gICAgY29uc29sZS5sb2codGVtcEFycjEsIHRlbXBBcnIyKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wQXJyMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0ZW1wQXJyMVtpXSAhPSB0ZW1wQXJyMltpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbiJdfQ==