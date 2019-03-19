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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmtUZWFjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZXdvcmtUZWFjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQVc1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixPQUFPLEVBQUUsSUFBSTtRQUNiLE1BQU0sRUFBRSxDQUFDO1FBQ1QsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQXNCLEVBQUU7UUFDbEMsWUFBWSxFQUFrQixFQUFFO1FBQ2hDLFlBQVksRUFBa0IsRUFBRTtRQUNoQyxhQUFhLEVBQUUsRUFBRTtRQUNqQixXQUFXLEVBQUUsQ0FBQztRQUNkLGFBQWEsRUFBRSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO1FBQ1YsUUFBUSxFQUFFLEtBQUs7UUFDZixLQUFLLEVBQUUsS0FBSztRQUNaLFFBQVEsRUFBRSxDQUFDO1FBQ1gsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEVBQUU7UUFDaEIsWUFBWSxFQUFFLEtBQUs7UUFDbkIsU0FBUyxFQUFlLEVBQUU7UUFDMUIsU0FBUyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7S0FDcEM7SUFDRCxNQUFNO1FBQU4saUJBWUM7UUFWRyxJQUFJLENBQUMsV0FBVyxFQUFFO2FBQ2IsSUFBSSxDQUFDO1lBQ0YsS0FBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxPQUFPLEVBQUUsS0FBSzthQUNqQixDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxD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QzNDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxjQUFjLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO1NBQ3JDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRCxhQUFhLFlBQUMsQ0FBbUM7UUFDN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULGtCQUFrQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQzNGLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFHRCxZQUFZLFlBQUMsQ0FBa0Q7UUFDM0QsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLE1BQU0sRUFBRTtZQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFNBQVMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNO2FBQzVDLENBQUMsQ0FBQTtTQUNMO2FBQU07WUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFNBQVMsRUFBRSxJQUFJO2FBQ2xCLENBQUMsQ0FBQTtTQUNMO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULGtCQUFrQixFQUFFLElBQUk7U0FDM0IsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHtcclxuICAgIEhvbWV3b3JrSXRlbSxcclxuICAgIFF1ZXN0aW9uSXRlbSxcclxuICAgIENob3NlSXRlbSxcclxuICAgIGhvbWV3b3JrUmVzLFxyXG4gICAgcXVlc3Rpb25SZXMsXHJcbiAgICBxdWVzdGlvblBvc3RSZXNcclxufSBmcm9tICcuLi8uLi91dGlscy9ob21ld29yay9ob21ld29ya1JlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcbmludGVyZmFjZSBRdWVzdGlvblBvc3RJdGVtIHtcclxuICAgIHR5cGU6IDAgfCAxXHJcbiAgICBxdWVzdGlvbkluZGV4OiBzdHJpbmdcclxuICAgIHF1ZXN0aW9uOiBzdHJpbmdcclxuICAgIGltYWdlVVJMczogeyB1cmw6IHN0cmluZyB9W11cclxuICAgIGNob3NlTGlzdDogQ2hvc2VJdGVtW11cclxuICAgIGNvcnJlY3RBbnN3ZXI6IHN0cmluZ1tdXHJcbn1cclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGxvYWRpbmc6IHRydWUsXHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGlzSW5MaXN0OiBmYWxzZSxcclxuICAgICAgICBhbnN3ZXJMaXN0OiA8UXVlc3Rpb25Qb3N0SXRlbVtdPltdLFxyXG4gICAgICAgIGhvbWV3b3JrTGlzdDogPEhvbWV3b3JrSXRlbVtdPltdLFxyXG4gICAgICAgIHF1ZXN0aW9uTGlzdDogPFF1ZXN0aW9uSXRlbVtdPltdLFxyXG4gICAgICAgIGNvcnJlY3RBbnN3ZXI6IFtdLFxyXG4gICAgICAgIHF1ZXN0aW9uTnVtOiAwLFxyXG4gICAgICAgIHF1ZXN0aW9uSW5kZXg6IDAsXHJcbiAgICAgICAgbGlzdE51bTogMCxcclxuICAgICAgICBpc0RlbGV0ZTogZmFsc2UsXHJcbiAgICAgICAgaXNBZGQ6IGZhbHNlLFxyXG4gICAgICAgIGNob3NlTnVtOiAwLFxyXG4gICAgICAgIGhvbWV3b3JrTmFtZTogJycsXHJcbiAgICAgICAgcXVlc3Rpb25OYW1lOiAnJyxcclxuICAgICAgICBxdWVzdGlvblR5cGU6IGZhbHNlLFxyXG4gICAgICAgIGNob3NlTGlzdDogPENob3NlSXRlbVtdPltdLFxyXG4gICAgICAgIGltYWdlVVJMczogW3sgdXJsOiAnaW1hZ2VVUkxzJyB9XVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJrliJfooahcclxuICAgICAgICB0aGlzLmdldEhvbWV3b3JrKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ob21ld29ya0xpc3QpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0SG9tZXdvcmsoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGhvbWV3b3JrUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2VcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MDAwMDAwMDAxJyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGhvbWV3b3JrUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGhvbWV3b3JrTGlzdDogcmVzLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muWIl+ihqOacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRRdWVzdGlvbihob21ld29yazogSG9tZXdvcmtJdGVtKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6IGhvbWV3b3JrLmhvbWV3b3JrSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpidcclxuICAgICAgICAgICAgICAgICAgICAvLyBob21ld29ya0lEOiAnOSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGxldCBxdWVzdGlvbkxpc3QgPSByZXMucmVzdWx0LnNvcnQoZnVuY3Rpb24oYTogUXVlc3Rpb25JdGVtLCBiOiBRdWVzdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChhLnF1ZXN0aW9uSW5kZXgpIC0gcGFyc2VJbnQoYi5xdWVzdGlvbkluZGV4KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpdCBvZiBxdWVzdGlvbkxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGl0LmNob3NlTGlzdCA9IGl0LmNob3NlTGlzdC5zb3J0KGZ1bmN0aW9uKGE6IENob3NlSXRlbSwgYjogQ2hvc2VJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuY2hvc2VJbmRleCkgLSBwYXJzZUludChiLmNob3NlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3Rpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb25MaXN0W2ldLmNvcnJlY3RBbnN3ZXIuaW5kZXhPZihqLnRvU3RyaW5nKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMlxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGlzSW5MaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiBxdWVzdGlvbkxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcG9zdEhvbWV3b3JrKGhvbWV3b3JrX25hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblBvc3RSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYwMDAwMDAwMDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogaG9tZXdvcmtfbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya0lEOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cXVlc3Rpb25Qb3N0UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZGVsZXRlSG9tZXdvcmsoaG9tZXdvcmtfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxxdWVzdGlvblBvc3RSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYwMDAwMDAwMDEnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrTmFtZTogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya0lEOiBob21ld29ya19pZCxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBudWxsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cXVlc3Rpb25Qb3N0UmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcXVlc3Rpb25OdW06IDAsXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IDAsXHJcbiAgICAgICAgICAgIGFuc3dlckxpc3Q6IFtdLFxyXG4gICAgICAgICAgICBob21ld29ya05hbWU6ICcnLFxyXG4gICAgICAgICAgICBxdWVzdGlvbk5hbWU6ICcnLFxyXG4gICAgICAgICAgICBjaG9zZU51bTogMCxcclxuICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgZW50cnlDYXJkKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbGlzdE51bTogZS5jdXJyZW50VGFyZ2V0LmlkXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDojrflj5bkvZzkuJror6bmg4VcclxuICAgICAgICB0aGlzLmdldFF1ZXN0aW9uKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlzSW5MaXN0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGJhY2tDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzQWRkOiBmYWxzZSxcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICB0aGlzLmdldEhvbWV3b3JrKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYWRkQ2FyZCgpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBpc0FkZDogdHJ1ZSxcclxuICAgICAgICAgICAgcXVlc3Rpb25OdW06IDEsXHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiB0cnVlLFxyXG4gICAgICAgICAgICBjaG9zZUxpc3Q6IFs8Q2hvc2VJdGVtPnsgbmFtZTogJycsIGNob3NlSW5kZXg6ICcwJyB9XSxcclxuICAgICAgICAgICAgY2hvc2VOdW06IDFcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pZF9jYXJkKVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxpc3ROdW06IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LmlkX2NhcmRcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmhvbWV3b3JrSUQpXHJcbiAgICAgICAgdGhpcy5kZWxldGVIb21ld29yayh0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5ob21ld29ya0lEKVxyXG4gICAgICAgIHRoaXMuZ2V0SG9tZXdvcmsoKVxyXG4gICAgfSxcclxuICAgIGFkZENob3NlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5jaG9zZUxpc3QpXHJcbiAgICAgICAgdGhpcy5kYXRhLmNob3NlTGlzdC5wdXNoKDxDaG9zZUl0ZW0+e1xyXG4gICAgICAgICAgICBuYW1lOiAnJyxcclxuICAgICAgICAgICAgY2hvc2VJbmRleDogdGhpcy5kYXRhLmNob3NlTGlzdC5sZW5ndGgudG9TdHJpbmcoKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2hvc2VOdW06IHRoaXMuZGF0YS5jaG9zZU51bSArIDEsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogdGhpcy5kYXRhLmNob3NlTGlzdFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhKVxyXG4gICAgfSxcclxuICAgIGRhdGFDaGVjaygpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmNvcnJlY3RBbnN3ZXIubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+36K6+572u5q2j56Gu6YCJ6aG577yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OYW1lLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+Whq+WGmemimOebru+8gScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5kYXRhLmhvbWV3b3JrTmFtZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfor7forr7nva7kvZzkuJrlkI3np7DvvIEnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvblN0ZXBzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGVwJylcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmlzQWRkKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5kYXRhQ2hlY2soKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcXVlc3Rpb25fdHlwZTogMCB8IDEgPSAwXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uX3R5cGUgPSAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICA7KDxRdWVzdGlvblBvc3RJdGVtW10+dGhpcy5kYXRhLmFuc3dlckxpc3QpW3RoaXMuZGF0YS5xdWVzdGlvbkluZGV4XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uOiB0aGlzLmRhdGEucXVlc3Rpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IHRoaXMuZGF0YS5jb3JyZWN0QW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHF1ZXN0aW9uX3R5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VMaXN0OiB0aGlzLmRhdGEuY2hvc2VMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlVVJMczogdGhpcy5kYXRhLmltYWdlVVJMc1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJMaXN0OiB0aGlzLmRhdGEuYW5zd2VyTGlzdFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbk51bSAtIDEgPT0gdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXgpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbk51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtICsgMVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VOdW06IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleCArIDEsXHJcbiAgICAgICAgICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgY2hvc2VMaXN0OiBbPENob3NlSXRlbT57IG5hbWU6ICcnLCBjaG9zZUluZGV4OiAnMCcgfV1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXggPD0gdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uSW5kZXg6IHRoaXMuZGF0YS5xdWVzdGlvbkluZGV4ICsgMVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25TdGVwc0JhY2soKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgcXVlc3Rpb25JbmRleDogTWF0aC5tYXgoMCwgdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXggLSAxKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc3QgcXVlc3Rpb24gPSA8UXVlc3Rpb25Qb3N0SXRlbT50aGlzLmRhdGEuYW5zd2VyTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25JbmRleF1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBxdWVzdGlvbk5hbWU6IHF1ZXN0aW9uLnF1ZXN0aW9uLFxyXG4gICAgICAgICAgICBxdWVzdGlvblR5cGU6IHF1ZXN0aW9uLnR5cGUgPT0gMSxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiBxdWVzdGlvbi5jaG9zZUxpc3QubWFwKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLmNvcnJlY3RBbnN3ZXIuaW5kZXhPZih2YWx1ZS5jaG9zZUluZGV4KSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuY2hlY2tlZCA9IDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgY2hvc2VOdW06IHF1ZXN0aW9uLmNob3NlTGlzdC5sZW5ndGgsXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IHF1ZXN0aW9uLmNvcnJlY3RBbnN3ZXJcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvbkZpbmlzaGVkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdmaW5pc2gnKVxyXG4gICAgICAgIGlmICghdGhpcy5kYXRhQ2hlY2soKSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHF1ZXN0aW9uX3R5cGU6IDAgfCAxID0gMFxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uX3R5cGUgPSAxXHJcbiAgICAgICAgfVxyXG4gICAgICAgIDsoPFF1ZXN0aW9uUG9zdEl0ZW1bXT50aGlzLmRhdGEuYW5zd2VyTGlzdClbdGhpcy5kYXRhLnF1ZXN0aW9uSW5kZXhdID0ge1xyXG4gICAgICAgICAgICBxdWVzdGlvbkluZGV4OiB0aGlzLmRhdGEucXVlc3Rpb25JbmRleC50b1N0cmluZygpLFxyXG4gICAgICAgICAgICBxdWVzdGlvbjogdGhpcy5kYXRhLnF1ZXN0aW9uTmFtZSxcclxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogdGhpcy5kYXRhLmNvcnJlY3RBbnN3ZXIsXHJcbiAgICAgICAgICAgIHR5cGU6IHF1ZXN0aW9uX3R5cGUsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogdGhpcy5kYXRhLmNob3NlTGlzdCxcclxuICAgICAgICAgICAgaW1hZ2VVUkxzOiB0aGlzLmRhdGEuaW1hZ2VVUkxzXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGFuc3dlckxpc3Q6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgfSlcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEuYW5zd2VyTGlzdClcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmFuc3dlckxpc3QubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvL+acrOmhteeahOaVsOaNruaPkOS6pFxyXG4gICAgICAgICAgICB0aGlzLnBvc3RIb21ld29yayh0aGlzLmRhdGEuaG9tZXdvcmtOYW1lKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyKClcclxuICAgICAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBpbnB1dEhvbWV3b3JrTmFtZShlOiB3eC5JbnB1dEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaG9tZXdvcmtOYW1lOiBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgaW5wdXRRdWVzdGlvbk5hbWUoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTmFtZTogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIG9uZUNob3NlSW5wdXQoZTogd3guSW5wdXRFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZGF0YS5jaG9zZUxpc3RbZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhdLm5hbWUgPSBlLmRldGFpbC52YWx1ZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBjaG9zZUxpc3Q6IHRoaXMuZGF0YS5jaG9zZUxpc3RcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YSlcclxuICAgIH0sXHJcbiAgICBpbnB1dENob3NlKGU6IHd4LkZvcm1FdmVudCkge1xyXG4gICAgICAgIGxldCBjaG9zZUxpc3Q6IENob3NlSXRlbVtdID0gW11cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5jaG9zZU51bTsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNob3NlTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGUuZGV0YWlsLnZhbHVlWydjaG9zZScgKyBpLnRvU3RyaW5nKCldIGFzIHN0cmluZyxcclxuICAgICAgICAgICAgICAgIGNob3NlSW5kZXg6IGkudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgY2hvc2VMaXN0OiBjaG9zZUxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCcsIHRoaXMuZGF0YS5jaG9zZUxpc3QpXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25UeXBlQ2hhbmdlKGU6IHd4LkN1c3RvbUV2ZW50PCdjaGFuZ2UnLCB7IHZhbHVlOiBib29sZWFuIH0+KSB7XHJcbiAgICAgICAgaWYgKGUuZGV0YWlsLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvblR5cGU6IDFcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25UeXBlOiAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5xdWVzdGlvblR5cGUpXHJcbiAgICB9LFxyXG4gICAgY2hlY2tib3hDaGFuZ2UoZTogeyBkZXRhaWw6IHsgdmFsdWU6IGFueSB9IH0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEucXVlc3Rpb25UeXBlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gW2UuZGV0YWlsLnZhbHVlXVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpdCBvZiB0aGlzLmRhdGEuY2hvc2VMaXN0IGFzIENob3NlSXRlbVtdKSB7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKGl0LmNob3NlSW5kZXgpID49IDApIHtcclxuICAgICAgICAgICAgICAgIGl0LmNoZWNrZWQgPSAyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiB0aGlzLmRhdGEuY2hvc2VMaXN0LFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiB2YWx1ZVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExpc3RUb3VjaOinpuaRuOW8gOWni1xyXG4gICAgTGlzdFRvdWNoU3RhcnQoZTogeyB0b3VjaGVzOiB7IHBhZ2VYOiBhbnkgfVtdIH0pIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBMaXN0VG91Y2hTdGFydDogZS50b3VjaGVzWzBdLnBhZ2VYXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTGlzdFRvdWNo6K6h566X5pa55ZCRXHJcbiAgICBMaXN0VG91Y2hNb3ZlKGU6IHsgdG91Y2hlczogeyBwYWdlWDogbnVtYmVyIH1bXSB9KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgTGlzdFRvdWNoRGlyZWN0aW9uOiBlLnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLmRhdGEuTGlzdFRvdWNoU3RhcnQgPiAwID8gJ3JpZ2h0JyA6ICdsZWZ0J1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExpc3RUb3VjaOiuoeeul+a7muWKqFxyXG4gICAgTGlzdFRvdWNoRW5kKGU6IHsgY3VycmVudFRhcmdldDogeyBkYXRhc2V0OiB7IHRhcmdldDogYW55IH0gfSB9KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5MaXN0VG91Y2hEaXJlY3Rpb24gPT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBtb2RhbE5hbWU6IGUuY3VycmVudFRhcmdldC5kYXRhc2V0LnRhcmdldFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBtb2RhbE5hbWU6IG51bGxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgTGlzdFRvdWNoRGlyZWN0aW9uOiBudWxsXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuIl19