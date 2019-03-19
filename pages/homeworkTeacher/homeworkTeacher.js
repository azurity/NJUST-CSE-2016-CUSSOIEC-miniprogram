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
                                    courseID: wx.getStorageSync('CourseDetail').courseID,
                                    personID: app.globalData.personInfo.personID,
                                    college: app.globalData.personInfo.college
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
                                    courseID: wx.getStorageSync('CourseDetail').courseID,
                                    personID: app.globalData.personInfo.personID,
                                    college: app.globalData.personInfo.college,
                                    homeworkID: homework.homeworkID,
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
                                    personID: app.globalData.personInfo.personID,
                                    college: app.globalData.personInfo.college,
                                    courseID: wx.getStorageSync('courseDetail').courseID,
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
                                    personID: app.globalData.personInfo.personID,
                                    college: app.globalData.personInfo.college,
                                    courseID: wx.getStorageSync('courseDetail').courseID,
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
        var _this = this;
        console.log('finish');
        if (!this.dataCheck()) {
            return;
        }
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
        if (this.data.answerList.length > 0) {
            this.postHomework(this.data.homeworkName)
                .then(function () {
                _this.backCard();
            })
                .catch(function (reason) {
                console.log(reason);
            });
        }
        else {
            this.clear();
            this.backCard();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmtUZWFjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZXdvcmtUZWFjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQVc1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQXNCLEVBQUU7UUFDbEMsWUFBWSxFQUFrQixFQUFFO1FBQ2hDLFlBQVksRUFBa0IsRUFBRTtRQUNoQyxhQUFhLEVBQUUsRUFBRTtRQUNqQixXQUFXLEVBQUUsQ0FBQztRQUNkLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxDQUFDO1FBQ1gsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsU0FBUyxFQUFlLEVBQUU7UUFDMUIsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7S0FDcEM7SUFDRCxNQUFNO1FBQU4saUJBWUM7UUFWRyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxD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O2dCQUNULFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtTQUNMO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULGtCQUFrQixFQUFFLElBQUk7U0FDM0IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHtcclxuICAgIEhvbWV3b3JrSXRlbSxcclxuICAgIFF1ZXN0aW9uSXRlbSxcclxuICAgIENob3NlSXRlbSxcclxuICAgIGhvbWV3b3JrUmVzLFxyXG4gICAgcXVlc3Rpb25SZXMsXHJcbiAgICBxdWVzdGlvblBvc3RSZXNcclxufSBmcm9tICcuLi8uLi91dGlscy9ob21ld29yay9ob21ld29ya1JlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcbmludGVyZmFjZSBRdWVzdGlvblBvc3RJdGVtIHtcclxuICAgIHR5cGU6IDAgfCAxXHJcbiAgICBxdWVzdGlvbkluZGV4OiBzdHJpbmdcclxuICAgIHF1ZXN0aW9uOiBzdHJpbmdcclxuICAgIGltYWdlVVJMczogeyB1cmw6IHN0cmluZyB9W11cclxuICAgIGNob3NlTGlzdDogQ2hvc2VJdGVtW11cclxuICAgIGNvcnJlY3RBbnN3ZXI6IHN0cmluZ1tdXHJcbn1cclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGlzSW5MaXN0OiBmYWxzZSxcclxuICAgICAgICBhbnN3ZXJMaXN0OiA8UXVlc3Rpb25Qb3N0SXRlbVtdPltdLFxyXG4gICAgICAgIGhvbWV3b3JrTGlzdDogPEhvbWV3b3JrSXRlbVtdPltdLFxyXG4gICAgICAgIHF1ZXN0aW9uTGlzdDogPFF1ZXN0aW9uSXRlbVtdPltdLFxyXG4gICAgICAgIGNvcnJlY3RBbnN3ZXI6IFtdLFxyXG4gICAgICAgIHF1ZXN0aW9uTnVtOiAwLFxyXG4gICAgICAgIHF1ZXN0aW9uSW5kZXg6IDAsXHJcbiAgICAgICAgbGlzdE51bTogMCxcclxuICAgICAgICBpc0RlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgaXNBZGQ6IGZhbHNlLFxyXG4gICAgICAgIGNob3NlTnVtOiAwLFxyXG4gICAgICAgIGhvbWV3b3JrTmFtZTogJycsXHJcbiAgICAgICAgcXVlc3Rpb25OYW1lOiAnJyxcclxuICAgICAgICBxdWVzdGlvblR5cGU6IGZhbHNlLFxyXG4gICAgICAgIGNob3NlTGlzdDogPENob3NlSXRlbVtdPltdLFxyXG4gICAgICAgIGltYWdlVVJMczogW3sgdXJsOiAnaW1hZ2VVUkxzJyB9XVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJrliJfooahcclxuICAgICAgICB0aGlzLmdldEhvbWV3b3JrKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ob21ld29ya0xpc3QpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0SG9tZXdvcmsoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGhvbWV3b3JrUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JbmZvIS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JbmZvIS5jb2xsZWdlXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGVyc29uSUQ6ICc5MTYwMDAwMDAwMDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxob21ld29ya1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBob21ld29ya0xpc3Q6IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrliJfooajmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0UXVlc3Rpb24oaG9tZXdvcms6IEhvbWV3b3JrSXRlbSkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJykuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8hLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8hLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogaG9tZXdvcmsuaG9tZXdvcmtJRCxcclxuICAgICAgICAgICAgICAgICAgICAvL2NvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSUQ6ICc5J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHF1ZXN0aW9uUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbGV0IHF1ZXN0aW9uTGlzdCA9IHJlcy5yZXN1bHQuc29ydChmdW5jdGlvbihhOiBRdWVzdGlvbkl0ZW0sIGI6IFF1ZXN0aW9uSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEucXVlc3Rpb25JbmRleCkgLSBwYXJzZUludChiLnF1ZXN0aW9uSW5kZXgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0IG9mIHF1ZXN0aW9uTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaXQuY2hvc2VMaXN0ID0gaXQuY2hvc2VMaXN0LnNvcnQoZnVuY3Rpb24oYTogQ2hvc2VJdGVtLCBiOiBDaG9zZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5jaG9zZUluZGV4KSAtIHBhcnNlSW50KGIuY2hvc2VJbmRleClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVzdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbkxpc3RbaV0uY29ycmVjdEFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwb3N0SG9tZXdvcmsoaG9tZXdvcmtfbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUG9zdFJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29yaycsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSW5mbyEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogYXBwLmdsb2JhbERhdGEucGVyc29uSW5mbyEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ2NvdXJzZURldGFpbCcpLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICAvL3BlcnNvbklEOiAnOTE2MDAwMDAwMDAxJyxcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogaG9tZXdvcmtfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya0lEOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cXVlc3Rpb25Qb3N0UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsZXRlSG9tZXdvcmsoaG9tZXdvcmtfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblBvc3RSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8hLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbkluZm8hLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjb3Vyc2VEZXRhaWwnKS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICAvL2NvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wZXJzb25JRDogJzkxNjAwMDAwMDAwMScsXHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJyxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya05hbWU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogaG9tZXdvcmtfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogbnVsbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHF1ZXN0aW9uUG9zdFJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfSxcclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiAwLFxyXG4gICAgICAgICAgICBxdWVzdGlvbkluZGV4OiAwLFxyXG4gICAgICAgICAgICBhbnN3ZXJMaXN0OiBbXSxcclxuICAgICAgICAgICAgaG9tZXdvcmtOYW1lOiAnJyxcclxuICAgICAgICAgICAgcXVlc3Rpb25OYW1lOiAnJyxcclxuICAgICAgICAgICAgY2hvc2VOdW06IDAsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uVHlwZTogZmFsc2VcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGVudHJ5Q2FyZChlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxpc3ROdW06IGUuY3VycmVudFRhcmdldC5pZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia6K+m5oOFXHJcbiAgICAgICAgdGhpcy5nZXRRdWVzdGlvbih0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBpc0luTGlzdDogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBiYWNrQ2FyZCgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpc0FkZDogZmFsc2UsXHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgICAgdGhpcy5nZXRIb21ld29yaygpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGFkZENhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNBZGQ6IHRydWUsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiAxLFxyXG4gICAgICAgICAgICBpc0luTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiBbPENob3NlSXRlbT57IG5hbWU6ICcnLCBjaG9zZUluZGV4OiAnMCcgfV0sXHJcbiAgICAgICAgICAgIGNob3NlTnVtOiAxXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBkZWxldGVDYXJkKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWRfY2FyZClcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZF9jYXJkXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5ob21ld29ya0lEKVxyXG4gICAgICAgIHRoaXMuZGVsZXRlSG9tZXdvcmsodGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaG9tZXdvcmtJRClcclxuICAgICAgICB0aGlzLmdldEhvbWV3b3JrKClcclxuICAgIH0sXHJcbiAgICBhZGRDaG9zZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuY2hvc2VMaXN0KVxyXG4gICAgICAgIHRoaXMuZGF0YS5jaG9zZUxpc3QucHVzaCg8Q2hvc2VJdGVtPntcclxuICAgICAgICAgICAgbmFtZTogJycsXHJcbiAgICAgICAgICAgIGNob3NlSW5kZXg6IHRoaXMuZGF0YS5jaG9zZUxpc3QubGVuZ3RoLnRvU3RyaW5nKClcclxuICAgICAgICB9KVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGNob3NlTnVtOiB0aGlzLmRhdGEuY2hvc2VOdW0gKyAxLFxyXG4gICAgICAgICAgICBjaG9zZUxpc3Q6IHRoaXMuZGF0YS5jaG9zZUxpc3RcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuICAgIH0sXHJcbiAgICBkYXRhQ2hlY2soKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5jb3JyZWN0QW5zd2VyLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+iuvue9ruato+ehrumAiemhue+8gScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfor7floavlhpnpopjnm67vvIEnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGF0YS5ob21ld29ya05hbWUubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+36K6+572u5L2c5Lia5ZCN56ew77yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25TdGVwcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnc3RlcCcpXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5pc0FkZCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuZGF0YUNoZWNrKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IHF1ZXN0aW9uX3R5cGU6IDAgfCAxID0gMFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvblR5cGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbl90eXBlID0gMVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgOyg8UXVlc3Rpb25Qb3N0SXRlbVtdPnRoaXMuZGF0YS5hbnN3ZXJMaXN0KVt0aGlzLmRhdGEucXVlc3Rpb25JbmRleF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25JbmRleDogdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXgudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbjogdGhpcy5kYXRhLnF1ZXN0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiB0aGlzLmRhdGEuY29ycmVjdEFuc3dlcixcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBxdWVzdGlvbl90eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlTGlzdDogdGhpcy5kYXRhLmNob3NlTGlzdCxcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZVVSTHM6IHRoaXMuZGF0YS5pbWFnZVVSTHNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuYW5zd2VyTGlzdClcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gLSAxID09IHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSArIDFcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbk5hbWU6ICcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlTnVtOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uVHlwZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25JbmRleDogdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXggKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIGNob3NlTGlzdDogWzxDaG9zZUl0ZW0+eyBuYW1lOiAnJywgY2hvc2VJbmRleDogJzAnIH1dXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4IDw9IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3QubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCArIDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tDYXJkKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3eC5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uU3RlcHNCYWNrKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IE1hdGgubWF4KDAsIHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4IC0gMSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnN0IHF1ZXN0aW9uID0gPFF1ZXN0aW9uUG9zdEl0ZW0+dGhpcy5kYXRhLmFuc3dlckxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXhdXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcXVlc3Rpb25OYW1lOiBxdWVzdGlvbi5xdWVzdGlvbixcclxuICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiBxdWVzdGlvbi50eXBlID09IDEsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogcXVlc3Rpb24uY2hvc2VMaXN0Lm1hcCgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5jb3JyZWN0QW5zd2VyLmluZGV4T2YodmFsdWUuY2hvc2VJbmRleCkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLmNoZWNrZWQgPSAyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWVcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgIGNob3NlTnVtOiBxdWVzdGlvbi5jaG9zZUxpc3QubGVuZ3RoLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBxdWVzdGlvbi5jb3JyZWN0QW5zd2VyXHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25GaW5pc2hlZCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZmluaXNoJylcclxuICAgICAgICBpZiAoIXRoaXMuZGF0YUNoZWNrKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBxdWVzdGlvbl90eXBlOiAwIHwgMSA9IDBcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICBxdWVzdGlvbl90eXBlID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICA7KDxRdWVzdGlvblBvc3RJdGVtW10+dGhpcy5kYXRhLmFuc3dlckxpc3QpW3RoaXMuZGF0YS5xdWVzdGlvbkluZGV4XSA9IHtcclxuICAgICAgICAgICAgcXVlc3Rpb25JbmRleDogdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXgudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgcXVlc3Rpb246IHRoaXMuZGF0YS5xdWVzdGlvbk5hbWUsXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IHRoaXMuZGF0YS5jb3JyZWN0QW5zd2VyLFxyXG4gICAgICAgICAgICB0eXBlOiBxdWVzdGlvbl90eXBlLFxyXG4gICAgICAgICAgICBjaG9zZUxpc3Q6IHRoaXMuZGF0YS5jaG9zZUxpc3QsXHJcbiAgICAgICAgICAgIGltYWdlVVJMczogdGhpcy5kYXRhLmltYWdlVVJMc1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBhbnN3ZXJMaXN0OiB0aGlzLmRhdGEuYW5zd2VyTGlzdFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5hbnN3ZXJMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy/mnKzpobXnmoTmlbDmja7mj5DkuqRcclxuICAgICAgICAgICAgdGhpcy5wb3N0SG9tZXdvcmsodGhpcy5kYXRhLmhvbWV3b3JrTmFtZSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tDYXJkKClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhcigpXHJcbiAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgaW5wdXRIb21ld29ya05hbWUoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGlucHV0UXVlc3Rpb25OYW1lKGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbk5hbWU6IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBvbmVDaG9zZUlucHV0KGU6IHd4LklucHV0RXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRhdGEuY2hvc2VMaXN0W2UuY3VycmVudFRhcmdldC5kYXRhc2V0LmluZGV4XS5uYW1lID0gZS5kZXRhaWwudmFsdWVcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiB0aGlzLmRhdGEuY2hvc2VMaXN0XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEpXHJcbiAgICB9LFxyXG4gICAgaW5wdXRDaG9zZShlOiB3eC5Gb3JtRXZlbnQpIHtcclxuICAgICAgICBsZXQgY2hvc2VMaXN0OiBDaG9zZUl0ZW1bXSA9IFtdXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmRhdGEuY2hvc2VOdW07IGkrKykge1xyXG4gICAgICAgICAgICBjaG9zZUxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBlLmRldGFpbC52YWx1ZVsnY2hvc2UnICsgaS50b1N0cmluZygpXSBhcyBzdHJpbmcsXHJcbiAgICAgICAgICAgICAgICBjaG9zZUluZGV4OiBpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGNob3NlTGlzdDogY2hvc2VMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdWJtaXQnLCB0aGlzLmRhdGEuY2hvc2VMaXN0KVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uVHlwZUNoYW5nZShlOiB3eC5DdXN0b21FdmVudDwnY2hhbmdlJywgeyB2YWx1ZTogYm9vbGVhbiB9Pikge1xyXG4gICAgICAgIGlmIChlLmRldGFpbC52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiAxXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uVHlwZTogMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucXVlc3Rpb25UeXBlKVxyXG4gICAgfSxcclxuICAgIGNoZWNrYm94Q2hhbmdlKGU6IHsgZGV0YWlsOiB7IHZhbHVlOiBhbnkgfSB9KSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2NoZWNrYm945Y+R55SfY2hhbmdl5LqL5Lu277yM5pC65bimdmFsdWXlgLzkuLrvvJonLCBlLmRldGFpbC52YWx1ZSlcclxuICAgICAgICBsZXQgdmFsdWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhLnF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IFtlLmRldGFpbC52YWx1ZV1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaXQgb2YgdGhpcy5kYXRhLmNob3NlTGlzdCBhcyBDaG9zZUl0ZW1bXSkge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUuaW5kZXhPZihpdC5jaG9zZUluZGV4KSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBpdC5jaGVja2VkID0gMlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogdGhpcy5kYXRhLmNob3NlTGlzdCxcclxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogdmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMaXN0VG91Y2jop6bmkbjlvIDlp4tcclxuICAgIExpc3RUb3VjaFN0YXJ0KGU6IHsgdG91Y2hlczogeyBwYWdlWDogYW55IH1bXSB9KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgTGlzdFRvdWNoU3RhcnQ6IGUudG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExpc3RUb3VjaOiuoeeul+aWueWQkVxyXG4gICAgTGlzdFRvdWNoTW92ZShlOiB7IHRvdWNoZXM6IHsgcGFnZVg6IG51bWJlciB9W10gfSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIExpc3RUb3VjaERpcmVjdGlvbjogZS50b3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5kYXRhLkxpc3RUb3VjaFN0YXJ0ID4gMCA/ICdyaWdodCcgOiAnbGVmdCdcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMaXN0VG91Y2jorqHnrpfmu5rliqhcclxuICAgIExpc3RUb3VjaEVuZChlOiB7IGN1cnJlbnRUYXJnZXQ6IHsgZGF0YXNldDogeyB0YXJnZXQ6IGFueSB9IH0gfSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuTGlzdFRvdWNoRGlyZWN0aW9uID09ICdsZWZ0Jykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC50YXJnZXRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgbW9kYWxOYW1lOiBudWxsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIExpc3RUb3VjaERpcmVjdGlvbjogbnVsbFxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbn0pXHJcbiJdfQ==