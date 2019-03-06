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
        loading: true,
        basics: 0,
        isInList: false,
        answerList: [],
        homeworkList: [],
        questionList: [],
        correctAnswer: [],
        questionNum: 0,
        questionIndex: 0,
        listNum: 0,
        isDelete: false,
        isAdd: false,
        choseNum: 0,
        homeworkName: '',
        questionName: '',
        questionType: false,
        choseList: [],
        imageURLs: [{ url: 'imageURLs' }]
    },
    onLoad: function () {
        var _this = this;
        this.getHomework()
            .then(function () {
            _this.setData({
                loading: false
            });
            console.log(_this.data.homeworkList);
        })
            .catch(function (reason) {
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
                                    personID: '916000000001',
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
    getQuestion: function (homework) {
        return __awaiter(this, void 0, void 0, function () {
            var res, questionList, _i, questionList_1, it, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            wx.request({
                                url: app.globalData.hostName + '/course/homework',
                                method: 'GET',
                                data: {
                                    homeworkID: homework.homeworkID,
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
                            questionList = res.result.sort(function (a, b) {
                                return parseInt(a.questionIndex) - parseInt(b.questionIndex);
                            });
                            for (_i = 0, questionList_1 = questionList; _i < questionList_1.length; _i++) {
                                it = questionList_1[_i];
                                it.choseList = it.choseList.sort(function (a, b) {
                                    return parseInt(a.choseIndex) - parseInt(b.choseIndex);
                                });
                            }
                            for (i = 0; i < questionList.length; i++) {
                                for (j = 0; j < questionList[i].choseList.length; j++) {
                                    if (questionList[i].correctAnswer.indexOf(j.toString()) >= 0) {
                                        questionList[i].choseList[j].checked = 2;
                                    }
                                    else {
                                        questionList[i].choseList[j].checked = 0;
                                    }
                                }
                            }
                            this.setData({
                                isInList: true,
                                questionList: questionList
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
                                    personID: '916000000001',
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
    deleteHomework: function (homework_id) {
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
                                    personID: '916000000001',
                                    college: '南京理工大学',
                                    homeworkName: null,
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
    clear: function () {
        this.setData({
            questionNum: 0,
            questionIndex: 0,
            answerList: [],
            homeworkName: '',
            questionName: '',
            choseNum: 0,
            questionType: false
        });
    },
    entryCard: function (e) {
        var _this = this;
        this.setData({
            listNum: e.currentTarget.id
        });
        this.getQuestion(this.data.homeworkList[this.data.listNum])
            .then(function () {
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
            isAdd: false,
            isInList: false
        });
        this.clear();
        this.getHomework()
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    addCard: function () {
        this.setData({
            isAdd: true,
            questionNum: 1,
            isInList: true,
            choseList: [{ name: '', choseIndex: '0' }],
            choseNum: 1
        });
    },
    deleteCard: function (e) {
        console.log(e.currentTarget.dataset.id_card);
        this.setData({
            listNum: e.currentTarget.dataset.id_card
        });
        console.log(this.data.homeworkList[this.data.listNum].homeworkID);
        this.deleteHomework(this.data.homeworkList[this.data.listNum].homeworkID);
        this.getHomework();
    },
    addChose: function () {
        console.log(this.data.choseList);
        this.data.choseList.push({
            name: '',
            choseIndex: this.data.choseList.length.toString()
        });
        this.setData({
            choseNum: this.data.choseNum + 1,
            choseList: this.data.choseList
        });
        console.log(this.data);
    },
    dataCheck: function () {
        if (this.data.correctAnswer.length == 0) {
            wx.showToast({
                title: '请设置正确选项！',
                icon: 'none',
                duration: 2000
            });
        }
        else if (this.data.questionName.length == 0) {
            wx.showToast({
                title: '请填写题目！',
                icon: 'none',
                duration: 2000
            });
        }
        else if (this.data.homeworkName.length == 0) {
            wx.showToast({
                title: '请设置作业名称！',
                icon: 'none',
                duration: 2000
            });
        }
        else {
            return true;
        }
        return false;
    },
    questionSteps: function () {
        console.log('step');
        if (this.data.isAdd) {
            if (!this.dataCheck()) {
                return;
            }
            else {
                var question_type = 0;
                if (this.data.questionType) {
                    question_type = 1;
                }
                ;
                this.data.answerList[this.data.questionIndex] = {
                    questionIndex: this.data.questionIndex.toString(),
                    question: this.data.questionName,
                    correctAnswer: this.data.correctAnswer,
                    type: question_type,
                    choseList: this.data.choseList,
                    imageURLs: this.data.imageURLs
                };
                this.setData({
                    answerList: this.data.answerList
                });
                console.log(this.data.answerList);
                if (this.data.questionNum - 1 == this.data.questionIndex) {
                    this.setData({
                        questionNum: this.data.questionNum + 1
                    });
                }
                this.setData({
                    questionName: '',
                    choseNum: 1,
                    questionType: false,
                    questionIndex: this.data.questionIndex + 1,
                    correctAnswer: [],
                    choseList: [{ name: '', choseIndex: '0' }]
                });
            }
        }
        else {
            if (this.data.questionIndex <= this.data.questionList.length - 1) {
                this.setData({
                    questionIndex: this.data.questionIndex + 1
                });
                console.log(this.data);
            }
            else {
                this.backCard();
            }
        }
        wx.pageScrollTo({
            scrollTop: 0
        });
    },
    questionStepsBack: function () {
        this.setData({
            questionIndex: Math.max(0, this.data.questionIndex - 1)
        });
        var question = this.data.answerList[this.data.questionIndex];
        this.setData({
            questionName: question.question,
            questionType: question.type == 1,
            choseList: question.choseList.map(function (value) {
                if (question.correctAnswer.indexOf(value.choseIndex) >= 0) {
                    value.checked = 2;
                }
                return value;
            }),
            choseNum: question.choseList.length,
            correctAnswer: question.correctAnswer
        });
        console.log(this.data);
    },
    questionFinished: function () {
        console.log('finish', this.data.answerList);
        if (!this.dataCheck()) {
            return;
        }
        if (this.data.answerList.length > 0) {
            this.postHomework(this.data.homeworkName)
                .then(function () { })
                .catch(function (reason) {
                console.log(reason);
            });
        }
        this.clear();
        this.backCard();
    },
    inputHomeworkName: function (e) {
        this.setData({
            homeworkName: e.detail.value
        });
    },
    inputQuestionName: function (e) {
        this.setData({
            questionName: e.detail.value
        });
    },
    oneChoseInput: function (e) {
        this.data.choseList[e.currentTarget.dataset.index].name = e.detail.value;
        console.log(this.data);
        this.setData({
            choseList: this.data.choseList
        });
        console.log(this.data);
    },
    inputChose: function (e) {
        var choseList = [];
        for (var i = 0; i < this.data.choseNum; i++) {
            choseList.push({
                name: e.detail.value['chose' + i.toString()],
                choseIndex: i.toString()
            });
            this.setData({
                choseList: choseList
            });
        }
        console.log('submit', this.data.choseList);
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
        if (!this.data.questionType) {
            value = [e.detail.value];
        }
        for (var _i = 0, _a = this.data.choseList; _i < _a.length; _i++) {
            var it = _a[_i];
            if (value.indexOf(it.choseIndex) >= 0) {
                it.checked = 2;
            }
        }
        this.setData({
            choseList: this.data.choseList,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmtUZWFjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZXdvcmtUZWFjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQVc1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQXNCLEVBQUU7UUFDbEMsWUFBWSxFQUFrQixFQUFFO1FBQ2hDLFlBQVksRUFBa0IsRUFBRTtRQUNoQyxhQUFhLEVBQUUsRUFBRTtRQUNqQixXQUFXLEVBQUUsQ0FBQztRQUNkLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxDQUFDO1FBQ1gsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsU0FBUyxFQUFlLEVBQUU7UUFDMUIsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7S0FDcEM7SUFDRCxNQUFNO1FBQU4saUJBWUM7UUFWRyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxD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STtTQUMzQixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0osQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQge1xyXG4gICAgSG9tZXdvcmtJdGVtLFxyXG4gICAgUXVlc3Rpb25JdGVtLFxyXG4gICAgQ2hvc2VJdGVtLFxyXG4gICAgaG9tZXdvcmtSZXMsXHJcbiAgICBxdWVzdGlvblJlcyxcclxuICAgIHF1ZXN0aW9uUG9zdFJlc1xyXG59IGZyb20gJy4uLy4uL3V0aWxzL2hvbWV3b3JrL2hvbWV3b3JrUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuaW50ZXJmYWNlIFF1ZXN0aW9uUG9zdEl0ZW0ge1xyXG4gICAgdHlwZTogMCB8IDFcclxuICAgIHF1ZXN0aW9uSW5kZXg6IHN0cmluZ1xyXG4gICAgcXVlc3Rpb246IHN0cmluZ1xyXG4gICAgaW1hZ2VVUkxzOiB7IHVybDogc3RyaW5nIH1bXVxyXG4gICAgY2hvc2VMaXN0OiBDaG9zZUl0ZW1bXVxyXG4gICAgY29ycmVjdEFuc3dlcjogc3RyaW5nW11cclxufVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgbG9hZGluZzogdHJ1ZSxcclxuICAgICAgICBiYXNpY3M6IDAsXHJcbiAgICAgICAgaXNJbkxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGFuc3dlckxpc3Q6IDxRdWVzdGlvblBvc3RJdGVtW10+W10sXHJcbiAgICAgICAgaG9tZXdvcmtMaXN0OiA8SG9tZXdvcmtJdGVtW10+W10sXHJcbiAgICAgICAgcXVlc3Rpb25MaXN0OiA8UXVlc3Rpb25JdGVtW10+W10sXHJcbiAgICAgICAgY29ycmVjdEFuc3dlcjogW10sXHJcbiAgICAgICAgcXVlc3Rpb25OdW06IDAsXHJcbiAgICAgICAgcXVlc3Rpb25JbmRleDogMCxcclxuICAgICAgICBsaXN0TnVtOiAwLFxyXG4gICAgICAgIGlzRGVsZXRlOiBmYWxzZSxcclxuICAgICAgICBpc0FkZDogZmFsc2UsXHJcbiAgICAgICAgY2hvc2VOdW06IDAsXHJcbiAgICAgICAgaG9tZXdvcmtOYW1lOiAnJyxcclxuICAgICAgICBxdWVzdGlvbk5hbWU6ICcnLFxyXG4gICAgICAgIHF1ZXN0aW9uVHlwZTogZmFsc2UsXHJcbiAgICAgICAgY2hvc2VMaXN0OiA8Q2hvc2VJdGVtW10+W10sXHJcbiAgICAgICAgaW1hZ2VVUkxzOiBbeyB1cmw6ICdpbWFnZVVSTHMnIH1dXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muWIl+ihqFxyXG4gICAgICAgIHRoaXMuZ2V0SG9tZXdvcmsoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRpbmc6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmhvbWV3b3JrTGlzdClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRIb21ld29yaygpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8aG9tZXdvcmtSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmtfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdXJzZUlEOiB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJykuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYwMDAwMDAwMDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aG9tZXdvcmtSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiByZXMucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5YiX6KGo5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFF1ZXN0aW9uKGhvbWV3b3JrOiBIb21ld29ya0l0ZW0pIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8cXVlc3Rpb25SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogaG9tZXdvcmsuaG9tZXdvcmtJRCxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwNDA3JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSUQ6ICc5J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHF1ZXN0aW9uUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbGV0IHF1ZXN0aW9uTGlzdCA9IHJlcy5yZXN1bHQuc29ydChmdW5jdGlvbihhOiBRdWVzdGlvbkl0ZW0sIGI6IFF1ZXN0aW9uSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEucXVlc3Rpb25JbmRleCkgLSBwYXJzZUludChiLnF1ZXN0aW9uSW5kZXgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0IG9mIHF1ZXN0aW9uTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaXQuY2hvc2VMaXN0ID0gaXQuY2hvc2VMaXN0LnNvcnQoZnVuY3Rpb24oYTogQ2hvc2VJdGVtLCBiOiBDaG9zZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5jaG9zZUluZGV4KSAtIHBhcnNlSW50KGIuY2hvc2VJbmRleClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbkxpc3RbaV0uY29ycmVjdEFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwb3N0SG9tZXdvcmsoaG9tZXdvcmtfbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUG9zdFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ2NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjAwMDAwMDAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtOYW1lOiBob21ld29ya19uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblBvc3RSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBhc3luYyBkZWxldGVIb21ld29yayhob21ld29ya19pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUG9zdFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ2NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjAwMDAwMDAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtOYW1lOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6IGhvbWV3b3JrX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG51bGxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblBvc3RSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbk51bTogMCxcclxuICAgICAgICAgICAgcXVlc3Rpb25JbmRleDogMCxcclxuICAgICAgICAgICAgYW5zd2VyTGlzdDogW10sXHJcbiAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogJycsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogJycsXHJcbiAgICAgICAgICAgIGNob3NlTnVtOiAwLFxyXG4gICAgICAgICAgICBxdWVzdGlvblR5cGU6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBlbnRyeUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muivpuaDhVxyXG4gICAgICAgIHRoaXMuZ2V0UXVlc3Rpb24odGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWVcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYmFja0NhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNBZGQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBpc0luTGlzdDogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuY2xlYXIoKVxyXG4gICAgICAgIHRoaXMuZ2V0SG9tZXdvcmsoKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7fSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhZGRDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzQWRkOiB0cnVlLFxyXG4gICAgICAgICAgICBxdWVzdGlvbk51bTogMSxcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogWzxDaG9zZUl0ZW0+eyBuYW1lOiAnJywgY2hvc2VJbmRleDogJzAnIH1dLFxyXG4gICAgICAgICAgICBjaG9zZU51bTogMVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZGVsZXRlQ2FyZChlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkX2NhcmQpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbGlzdE51bTogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRfY2FyZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaG9tZXdvcmtJRClcclxuICAgICAgICB0aGlzLmRlbGV0ZUhvbWV3b3JrKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmhvbWV3b3JrSUQpXHJcbiAgICAgICAgdGhpcy5nZXRIb21ld29yaygpXHJcbiAgICB9LFxyXG4gICAgYWRkQ2hvc2UoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmNob3NlTGlzdClcclxuICAgICAgICB0aGlzLmRhdGEuY2hvc2VMaXN0LnB1c2goPENob3NlSXRlbT57XHJcbiAgICAgICAgICAgIG5hbWU6ICcnLFxyXG4gICAgICAgICAgICBjaG9zZUluZGV4OiB0aGlzLmRhdGEuY2hvc2VMaXN0Lmxlbmd0aC50b1N0cmluZygpXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBjaG9zZU51bTogdGhpcy5kYXRhLmNob3NlTnVtICsgMSxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiB0aGlzLmRhdGEuY2hvc2VMaXN0XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICB9LFxyXG4gICAgZGF0YUNoZWNrKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuY29ycmVjdEFuc3dlci5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfor7forr7nva7mraPnoa7pgInpobnvvIEnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbk5hbWUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35aGr5YaZ6aKY55uu77yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaG9tZXdvcmtOYW1lLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+iuvue9ruS9nOS4muWQjeensO+8gScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uU3RlcHMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N0ZXAnKVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaXNBZGQpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmRhdGFDaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBxdWVzdGlvbl90eXBlOiAwIHwgMSA9IDBcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25fdHlwZSA9IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIDsoPFF1ZXN0aW9uUG9zdEl0ZW1bXT50aGlzLmRhdGEuYW5zd2VyTGlzdClbdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXhdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4LnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb246IHRoaXMuZGF0YS5xdWVzdGlvbk5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogdGhpcy5kYXRhLmNvcnJlY3RBbnN3ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogcXVlc3Rpb25fdHlwZSxcclxuICAgICAgICAgICAgICAgICAgICBjaG9zZUxpc3Q6IHRoaXMuZGF0YS5jaG9zZUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VVUkxzOiB0aGlzLmRhdGEuaW1hZ2VVUkxzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTnVtIC0gMSA9PSB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0gKyAxXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OYW1lOiAnJyxcclxuICAgICAgICAgICAgICAgICAgICBjaG9zZU51bTogMSxcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvblR5cGU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4ICsgMSxcclxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBjaG9zZUxpc3Q6IFs8Q2hvc2VJdGVtPnsgbmFtZTogJycsIGNob3NlSW5kZXg6ICcwJyB9XVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25JbmRleCA8PSB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25JbmRleDogdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXggKyAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd3gucGFnZVNjcm9sbFRvKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvblN0ZXBzQmFjaygpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbkluZGV4OiBNYXRoLm1heCgwLCB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCAtIDEpXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zdCBxdWVzdGlvbiA9IDxRdWVzdGlvblBvc3RJdGVtPnRoaXMuZGF0YS5hbnN3ZXJMaXN0W3RoaXMuZGF0YS5xdWVzdGlvbkluZGV4XVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogcXVlc3Rpb24ucXVlc3Rpb24sXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uVHlwZTogcXVlc3Rpb24udHlwZSA9PSAxLFxyXG4gICAgICAgICAgICBjaG9zZUxpc3Q6IHF1ZXN0aW9uLmNob3NlTGlzdC5tYXAoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24uY29ycmVjdEFuc3dlci5pbmRleE9mKHZhbHVlLmNob3NlSW5kZXgpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jaGVja2VkID0gMlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICBjaG9zZU51bTogcXVlc3Rpb24uY2hvc2VMaXN0Lmxlbmd0aCxcclxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogcXVlc3Rpb24uY29ycmVjdEFuc3dlclxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uRmluaXNoZWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2ZpbmlzaCcsIHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhQ2hlY2soKSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5hbnN3ZXJMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy/mnKzpobXnmoTmlbDmja7mj5DkuqRcclxuICAgICAgICAgICAgdGhpcy5wb3N0SG9tZXdvcmsodGhpcy5kYXRhLmhvbWV3b3JrTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICB0aGlzLmJhY2tDYXJkKClcclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRIb21ld29ya05hbWUoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGlucHV0UXVlc3Rpb25OYW1lKGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbk5hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvbmVDaG9zZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRhdGEuY2hvc2VMaXN0W2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XS5uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiB0aGlzLmRhdGEuY2hvc2VMaXN0XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICB9LFxyXG4gICAgaW5wdXRDaG9zZShlOiB3eC5Gb3JtRXZlbnQpIHtcclxuICAgICAgICBsZXQgY2hvc2VMaXN0OiBDaG9zZUl0ZW1bXSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuY2hvc2VOdW07IGkrKykge1xyXG4gICAgICAgICAgICBjaG9zZUxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBlLmRldGFpbC52YWx1ZVsnY2hvc2UnICsgaS50b1N0cmluZygpXSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBjaG9zZUluZGV4OiBpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNob3NlTGlzdDogY2hvc2VMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWJtaXQnLCB0aGlzLmRhdGEuY2hvc2VMaXN0KVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uVHlwZUNoYW5nZShlOiB3eC5DdXN0b21FdmVudDwnY2hhbmdlJywgeyB2YWx1ZTogYm9vbGVhbiB9Pikge1xyXG4gICAgICAgIGlmIChlLmRldGFpbC52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVHlwZTogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucXVlc3Rpb25UeXBlKVxyXG4gICAgfSxcclxuICAgIGNoZWNrYm94Q2hhbmdlKGU6IHsgZGV0YWlsOiB7IHZhbHVlOiBhbnkgfSB9KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrYm945Y+R55SfY2hhbmdl5LqL5Lu277yM5pC65bimdmFsdWXlgLzkuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICBsZXQgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLnF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtlLmRldGFpbC52YWx1ZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaXQgb2YgdGhpcy5kYXRhLmNob3NlTGlzdCBhcyBDaG9zZUl0ZW1bXSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihpdC5jaG9zZUluZGV4KSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdC5jaGVja2VkID0gMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogdGhpcy5kYXRhLmNob3NlTGlzdCxcclxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogdmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMaXN0VG91Y2jop6bmkbjlvIDlp4tcclxuICAgIExpc3RUb3VjaFN0YXJ0KGU6IHsgdG91Y2hlczogeyBwYWdlWDogYW55IH1bXSB9KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgTGlzdFRvdWNoU3RhcnQ6IGUudG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExpc3RUb3VjaOiuoeeul+aWueWQkVxyXG4gICAgTGlzdFRvdWNoTW92ZShlOiB7IHRvdWNoZXM6IHsgcGFnZVg6IG51bWJlciB9W10gfSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIExpc3RUb3VjaERpcmVjdGlvbjogZS50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5kYXRhLkxpc3RUb3VjaFN0YXJ0ID4gMCA/ICdyaWdodCcgOiAnbGVmdCdcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMaXN0VG91Y2jorqHnrpfmu5rliqhcclxuICAgIExpc3RUb3VjaEVuZChlOiB7IGN1cnJlbnRUYXJnZXQ6IHsgZGF0YXNldDogeyB0YXJnZXQ6IGFueSB9IH0gfSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuTGlzdFRvdWNoRGlyZWN0aW9uID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBudWxsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIExpc3RUb3VjaERpcmVjdGlvbjogbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==