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
        correctAnswer: [],
        questionNum: 1,
        questionIndex: 0,
        listNum: 0,
        isDelete: false,
        isAdd: false,
        choseNum: 1,
        choseType: 0,
        homeworkName: '',
        questionName: '',
        questionType: false
    },
    onLoad: function () {
        var _this = this;
        Promise.all([this.getHomework()]).then(function () {
            console.log(_this.data.homeworkList);
        }).catch(function (reason) {
            console.log(reason);
        });
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
                                    homeworkID: homework_id,
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
    postHomework: function (homework_name) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/homework',
                                method: 'POST',
                                data: {
                                    courseID: '3',
                                    personID: '916106840407',
                                    college: '南京理工大学',
                                    homeworkName: homework_name,
                                    homeworkID: null,
                                    data: _this.data.answerList
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
    deleteHomework: function (homework_name, homework_id) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/homework',
                                method: 'POST',
                                data: {
                                    courseID: '3',
                                    personID: '916106840407',
                                    college: '南京理工大学',
                                    homeworkName: homework_name,
                                    homeworkID: homework_id,
                                    data: null
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
            .catch(function (reason) {
            console.log(reason);
        });
    },
    backCard: function () {
        this.setData({
            questionIndex: 0
        });
        this.setData({
            questionNum: 0
        });
        this.setData({
            isAdd: false
        });
        this.setData({
            choseNum: 1
        });
        this.setData({
            isInList: false
        });
        Promise.all([this.getHomework()]);
    },
    addCard: function () {
        this.setData({
            questionList: [{
                    questionIndex: '0',
                    question: '请输入题目'
                }]
        });
        this.setData({
            isAdd: true
        });
        this.setData({
            isInList: true
        });
    },
    deleteCard: function () {
        Promise.all([this.getHomework()]);
    },
    addChose: function () {
        this.setData({
            choseNum: this.data.choseNum + 1
        });
        console.log(this.data.choseNum);
    },
    questionSteps: function () {
        console.log(this.data.questionName);
        var finished = this.data.homeworkList[this.data.listNum].isFinished;
        if (this.data.correctAnswer.length == 0 && !finished) {
            wx.showToast({
                title: '请设置正确选项！',
                icon: 'none',
                duration: 2000
            });
        }
        else {
            this.data.answerList.push({
                questionIndex: this.data.questionIndex,
                questionName: this.data.questionName,
                correctAnswer: this.data.correctAnswer,
                type: this.data.questionType
            });
            this.setData({
                answerList: this.data.answerList
            });
            console.log(this.data.answerList);
            if (this.data.questionNum < this.data.questionList.length - 1 && !this.data.isAdd) {
                this.setData({
                    questionIndex: this.data.questionIndex + 1
                });
                this.setData({
                    correctAnswer: []
                });
            }
            else if (this.data.isAdd) {
                if (this.data.questionNum - 1 == this.data.questionIndex) {
                    this.setData({
                        questionNum: this.data.questionNum + 1
                    });
                }
                this.setData({
                    questionIndex: this.data.questionIndex + 1
                });
                this.setData({
                    correctAnswer: []
                });
            }
            else {
                this.setData({
                    questionIndex: 0
                });
                this.setData({
                    answerList: []
                });
                this.backCard();
            }
        }
        this.setData({
            questionName: ''
        });
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    questionStepsBack: function () {
        this.setData({
            questionIndex: this.data.questionIndex - 1
        });
        this.setData({
            questionName: this.data.answerList[this.data.questionIndex].questionName
        });
    },
    questionFinished: function () {
        Promise.all([this.postHomework(this.data.homeworkName)])
            .then(function (reason) {
            console.log(reason);
        }).catch(function (reason) {
            console.log(reason);
        });
        this.data.homeworkList[this.data.listNum].isFinished = true;
        this.setData({
            homeworkList: this.data.homeworkList
        });
        this.setData({
            questionNum: 0
        });
        this.setData({
            questionIndex: 0
        });
        this.setData({
            answerList: []
        });
        this.backCard();
    },
    inputQuestionName: function (e) {
        this.setData({
            questionName: e.detail.value
        });
    },
    questionTypeChange: function (e) {
        if (e.detail.value) {
            this.setData({
                questionType: 1
            });
        }
        else {
            this.setData({
                questionType: 0
            });
        }
        console.log(this.data.questionType);
    },
    checkboxChange: function (e) {
        console.log('checkbox发生change事件，携带value值为：', e.detail.value);
        var value = e.detail.value;
        if (this.data.choseType == 0) {
            value = [e.detail.value];
        }
        this.setData({
            correctAnswer: value
        });
    },
    ListTouchStart: function (e) {
        this.setData({
            ListTouchStart: e.touches[0].pageX
        });
    },
    ListTouchMove: function (e) {
        this.setData({
            ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
        });
    },
    ListTouchEnd: function (e) {
        if (this.data.ListTouchDirection == 'left') {
            this.setData({
                modalName: e.currentTarget.dataset.target
            });
        }
        else {
            this.setData({
                modalName: null
            });
        }
        this.setData({
            ListTouchDirection: null
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmtUZWFjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZXdvcmtUZWFjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQWM1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixNQUFNLEVBQUUsQ0FBQztRQUNULFFBQVEsRUFBRSxLQUFLO1FBQ2YsVUFBVSxFQUFFLEVBQUU7UUFDZCxhQUFhLEVBQUUsRUFBRTtRQUNqQixXQUFXLEVBQUUsQ0FBQztRQUNkLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxDQUFDO1FBQ1gsU0FBUyxFQUFFLENBQUM7UUFDWixZQUFZLEVBQUUsRUFBRTtRQUNoQixZQUFZLEVBQUUsRUFBRTtRQUNoQixZQUFZLEVBQUUsS0FBSztLQUN0QjtJQUNELE1BQU07UUFBTixpQkFPQztRQUxHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0gsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNyRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFB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QUMsQ0FBQTtJQUNOLENBQUM7Q0FDSixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJTXlBcHAgfSBmcm9tICcuLi8uLi9hcHAnXHJcbmltcG9ydCB7IGhvbWV3b3JrUmVzLCBxdWVzdGlvblJlcywgcXVlc3Rpb25Qb3N0UmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9tZXdvcmsvaG9tZXdvcmtSZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5pbnRlcmZhY2UgcXVlc3Rpb25JIHtcclxuICAgIHF1ZXN0aW9uSW5kZXg6IHN0cmluZ1xyXG59XHJcblxyXG50eXBlIHF1ZXN0aW9uID0gcXVlc3Rpb25JXHJcblxyXG5pbnRlcmZhY2UgY2hvc2VJIHtcclxuICAgIGNob3NlSW5kZXg6IHN0cmluZ1xyXG59XHJcblxyXG50eXBlIGNob3NlID0gY2hvc2VJXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBiYXNpY3M6IDAsXHJcbiAgICAgICAgaXNJbkxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGFuc3dlckxpc3Q6IFtdLFxyXG4gICAgICAgIGNvcnJlY3RBbnN3ZXI6IFtdLFxyXG4gICAgICAgIHF1ZXN0aW9uTnVtOiAxLFxyXG4gICAgICAgIHF1ZXN0aW9uSW5kZXg6IDAsXHJcbiAgICAgICAgbGlzdE51bTogMCxcclxuICAgICAgICBpc0RlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgaXNBZGQ6IGZhbHNlLFxyXG4gICAgICAgIGNob3NlTnVtOiAxLFxyXG4gICAgICAgIGNob3NlVHlwZTogMCxcclxuICAgICAgICBob21ld29ya05hbWU6ICcnLFxyXG4gICAgICAgIHF1ZXN0aW9uTmFtZTogJycsXHJcbiAgICAgICAgcXVlc3Rpb25UeXBlOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJrliJfooahcclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5nZXRIb21ld29yaygpXSkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ob21ld29ya0xpc3QpXHJcbiAgICAgICAgfSkuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRIb21ld29yaygpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8aG9tZXdvcmtSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmtfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdXJzZUlEOiB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJykuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYxMDY4NDA0MDcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aG9tZXdvcmtSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiByZXMucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5YiX6KGo5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFF1ZXN0aW9uKGhvbWV3b3JrX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8cXVlc3Rpb25SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogaG9tZXdvcmtfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpidcclxuICAgICAgICAgICAgICAgICAgICAvLyBob21ld29ya0lEOiAnOSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcG9zdEhvbWV3b3JrKGhvbWV3b3JrX25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblBvc3RSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYxMDY4NDA0MDcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogaG9tZXdvcmtfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya0lEOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cXVlc3Rpb25Qb3N0UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsZXRlSG9tZXdvcmsoaG9tZXdvcmtfbmFtZTogc3RyaW5nLCBob21ld29ya19pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUG9zdFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ2NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtOYW1lOiBob21ld29ya19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6IGhvbWV3b3JrX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblBvc3RSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBlbnRyeUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muivpuaDhVxyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldFF1ZXN0aW9uKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmhvbWV3b3JrSUQpXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5zb3J0KGZ1bmN0aW9uKGE6IHF1ZXN0aW9uLCBiOiBxdWVzdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEucXVlc3Rpb25JbmRleCkgLSBwYXJzZUludChiLnF1ZXN0aW9uSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3QubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtuXS5jaG9zZUxpc3QgPSB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W25dLmNob3NlTGlzdC5zb3J0KGZ1bmN0aW9uKGE6IGNob3NlLCBiOiBjaG9zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuY2hvc2VJbmRleCkgLSBwYXJzZUludChiLmNob3NlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0udXNlckFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNvcnJlY3RBbnN3ZXIuaW5kZXhPZihqLnRvU3RyaW5nKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiB0aGlzLmRhdGEucXVlc3Rpb25MaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0luTGlzdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBiYWNrQ2FyZCgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbkluZGV4OiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbk51bTogMFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNBZGQ6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBjaG9zZU51bTogMVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5nZXRIb21ld29yaygpXSlcclxuICAgIH0sXHJcbiAgICBhZGRDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6ICcwJyxcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uOiAn6K+36L6T5YWl6aKY55uuJ1xyXG4gICAgICAgICAgICB9XVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNBZGQ6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVDYXJkKCkge1xyXG4gICAgICAgIC8vIFByb21pc2UuYWxsKFt0aGlzLmRlbGV0ZUNhcmQoKV0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SG9tZXdvcmsoKV0pXHJcbiAgICB9LFxyXG4gICAgYWRkQ2hvc2UoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2hvc2VOdW06IHRoaXMuZGF0YS5jaG9zZU51bSArIDFcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5jaG9zZU51bSlcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvblN0ZXBzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5xdWVzdGlvbk5hbWUpXHJcbiAgICAgICAgbGV0IGZpbmlzaGVkOiBib29sZWFuID0gdGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaXNGaW5pc2hlZFxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuY29ycmVjdEFuc3dlci5sZW5ndGggPT0gMCAmJiAhZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+36K6+572u5q2j56Gu6YCJ6aG577yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLmFuc3dlckxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCxcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogdGhpcy5kYXRhLnF1ZXN0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IHRoaXMuZGF0YS5jb3JyZWN0QW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogdGhpcy5kYXRhLnF1ZXN0aW9uVHlwZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aCAtIDEgJiYgIXRoaXMuZGF0YS5pc0FkZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCArIDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5pc0FkZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbk51bSAtIDEgPT0gdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbk51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4ICsgMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogW11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcXVlc3Rpb25OYW1lOiAnJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgd3gucGFnZVNjcm9sbFRvKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvblN0ZXBzQmFjaygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCAtIDFcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogdGhpcy5kYXRhLmFuc3dlckxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXhdLnF1ZXN0aW9uTmFtZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25GaW5pc2hlZCgpIHtcclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5wb3N0SG9tZXdvcmsodGhpcy5kYXRhLmhvbWV3b3JrTmFtZSldKVxyXG4gICAgICAgICAgICAudGhlbigocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaXNGaW5pc2hlZCA9IHRydWVcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBob21ld29ya0xpc3Q6IHRoaXMuZGF0YS5ob21ld29ya0xpc3RcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbkluZGV4OiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBhbnN3ZXJMaXN0OiBbXVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICB9LFxyXG5cclxuICAgIGlucHV0UXVlc3Rpb25OYW1lKGUpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbk5hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvblR5cGVDaGFuZ2UoZSkge1xyXG4gICAgICAgIGlmIChlLmRldGFpbC52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVHlwZTogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucXVlc3Rpb25UeXBlKVxyXG4gICAgfSxcclxuICAgIGNoZWNrYm94Q2hhbmdlKGU6IHsgZGV0YWlsOiB7IHZhbHVlOiBhbnk7IH07IH0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5jaG9zZVR5cGUgPT0gMCkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtlLmRldGFpbC52YWx1ZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogdmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMaXN0VG91Y2jop6bmkbjlvIDlp4tcclxuICAgIExpc3RUb3VjaFN0YXJ0KGU6IHsgdG91Y2hlczogeyBwYWdlWDogYW55OyB9W107IH0pIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBMaXN0VG91Y2hTdGFydDogZS50b3VjaGVzWzBdLnBhZ2VYXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTGlzdFRvdWNo6K6h566X5pa55ZCRXHJcbiAgICBMaXN0VG91Y2hNb3ZlKGU6IHsgdG91Y2hlczogeyBwYWdlWDogbnVtYmVyOyB9W107IH0pIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBMaXN0VG91Y2hEaXJlY3Rpb246IGUudG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuZGF0YS5MaXN0VG91Y2hTdGFydCA+IDAgPyAncmlnaHQnIDogJ2xlZnQnXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTGlzdFRvdWNo6K6h566X5rua5YqoXHJcbiAgICBMaXN0VG91Y2hFbmQoZTogeyBjdXJyZW50VGFyZ2V0OiB7IGRhdGFzZXQ6IHsgdGFyZ2V0OiBhbnk7IH07IH07IH0pIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLkxpc3RUb3VjaERpcmVjdGlvbiA9PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIG1vZGFsTmFtZTogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIG1vZGFsTmFtZTogbnVsbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBMaXN0VG91Y2hEaXJlY3Rpb246IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KSJdfQ==