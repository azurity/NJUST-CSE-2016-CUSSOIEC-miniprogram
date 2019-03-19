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
        homeworkList: [],
        questionList: [],
        listNum: 0,
        loading: true
    },
    onLoad: function () {
        var _this = this;
        this.getHomework()
            .then(function () {
            _this.setData({
                loading: false
            });
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
                            if (homework.isFinished) {
                                for (i = 0; i < questionList.length; i++) {
                                    for (j = 0; j < questionList[i].choseList.length; j++) {
                                        if (questionList[i].userAnswer.indexOf(j.toString()) >= 0) {
                                            questionList[i].choseList[j].checked = 1;
                                        }
                                        else {
                                            questionList[i].choseList[j].checked = 0;
                                        }
                                        if (questionList[i].correctAnswer.indexOf(j.toString()) >= 0) {
                                            questionList[i].choseList[j].checked = 2;
                                        }
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
                                    homeworkID: homework_id,
                                    courseID: '3',
                                    personID: '916106840407',
                                    college: '南京理工大学',
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
        this.getQuestion(this.data.homeworkList[this.data.listNum])
            .then(function () { })
            .catch(function (reason) {
            console.log(reason);
        });
    },
    backCard: function () {
        this.setData({
            isInList: false,
            answerList: [],
            userAnswer: [],
            questionNum: 0
        });
        this.getHomework().catch(function (reason) {
            console.log(reason);
        });
    },
    questionSteps: function () {
        var finished = this.data.homeworkList[this.data.listNum].isFinished;
        if (this.data.userAnswer.length == 0 && !finished) {
            wx.showToast({
                title: '请作答！',
                icon: 'none',
                duration: 2000
            });
        }
        else {
            if (arrayEqual(this.data.userAnswer, this.data.questionList[this.data.questionNum].correctAnswer)) {
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
                    questionNum: this.data.questionNum + 1,
                    userAnswer: []
                });
            }
            else {
                if (!finished) {
                    this.postAnswer(this.data.homeworkList[this.data.listNum].homeworkID)
                        .then(function (reason) {
                        console.log(reason);
                    })
                        .catch(function (reason) {
                        console.log(reason);
                    });
                    this.data.homeworkList[this.data.listNum].isFinished = true;
                    this.setData({
                        homeworkList: this.data.homeworkList
                    });
                }
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
    for (var i = 0; i < tempArr1.length; i++) {
        if (tempArr1[i] != tempArr2[i]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBWSxFQUFFO1FBQ3hCLFVBQVUsRUFBWSxFQUFFO1FBQ3hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsWUFBWSxFQUFrQixFQUFFO1FBQ2hDLFlBQVksRUFBa0IsRUFBRTtRQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsTUFBTTtRQUFOLGlCQVdDO1FBVEcsSUFBSSxDQUFDLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0gsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNyRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyx1QkFBdUI7Z0NBQ3RELE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRTtvQ0FJRixRQUFRLEVBQUUsR0FBRztvQ0FDYixRQUFRLEVBQUUsY0FBYztvQ0FDeEIsT0FBTyxFQUFFLFFBQVE7aUNBQ3BCO2dDQUNELE9BQU8sRUFBRSxVQUFDLEVB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USxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM1QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sS0FBSyxDQUFBO1NBQ2Y7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHtcclxuICAgIEhvbWV3b3JrSXRlbSxcclxuICAgIFF1ZXN0aW9uSXRlbSxcclxuICAgIENob3NlSXRlbSxcclxuICAgIGhvbWV3b3JrUmVzLFxyXG4gICAgYW5zd2VyUmVzLFxyXG4gICAgcXVlc3Rpb25SZXNcclxufSBmcm9tICcuLi8uLi91dGlscy9ob21ld29yay9ob21ld29ya1JlcydcclxuXHJcbmNvbnN0IGFwcCA9IGdldEFwcDxJTXlBcHA+KClcclxuXHJcblBhZ2Uoe1xyXG4gICAgZGF0YToge1xyXG4gICAgICAgIGJhc2ljczogMCxcclxuICAgICAgICBpc0luTGlzdDogZmFsc2UsXHJcbiAgICAgICAgYW5zd2VyTGlzdDogPHN0cmluZ1tdPltdLFxyXG4gICAgICAgIHVzZXJBbnN3ZXI6IDxzdHJpbmdbXT5bXSxcclxuICAgICAgICBxdWVzdGlvbk51bTogMCxcclxuICAgICAgICBob21ld29ya0xpc3Q6IDxIb21ld29ya0l0ZW1bXT5bXSxcclxuICAgICAgICBxdWVzdGlvbkxpc3Q6IDxRdWVzdGlvbkl0ZW1bXT5bXSxcclxuICAgICAgICBsaXN0TnVtOiAwLFxyXG4gICAgICAgIGxvYWRpbmc6IHRydWVcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia5YiX6KGoXHJcbiAgICAgICAgdGhpcy5nZXRIb21ld29yaygpXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZGluZzogZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0SG9tZXdvcmsoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGhvbWV3b3JrUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2VcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwNDA3JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGhvbWV3b3JrUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGhvbWV3b3JrTGlzdDogcmVzLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRRdWVzdGlvbihob21ld29yazogSG9tZXdvcmtJdGVtKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6IGhvbWV3b3JrLmhvbWV3b3JrSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpidcclxuICAgICAgICAgICAgICAgICAgICAvLyBob21ld29ya0lEOiAnOSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIGxldCBxdWVzdGlvbkxpc3QgPSByZXMucmVzdWx0LnNvcnQoZnVuY3Rpb24oYTogUXVlc3Rpb25JdGVtLCBiOiBRdWVzdGlvbkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChhLnF1ZXN0aW9uSW5kZXgpIC0gcGFyc2VJbnQoYi5xdWVzdGlvbkluZGV4KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpdCBvZiBxdWVzdGlvbkxpc3QpIHtcclxuICAgICAgICAgICAgICAgIGl0LmNob3NlTGlzdCA9IGl0LmNob3NlTGlzdC5zb3J0KGZ1bmN0aW9uKGE6IENob3NlSXRlbSwgYjogQ2hvc2VJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEuY2hvc2VJbmRleCkgLSBwYXJzZUludChiLmNob3NlSW5kZXgpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChob21ld29yay5pc0ZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHF1ZXN0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb25MaXN0W2ldLnVzZXJBbnN3ZXIuaW5kZXhPZihqLnRvU3RyaW5nKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb25MaXN0W2ldLmNvcnJlY3RBbnN3ZXIuaW5kZXhPZihqLnRvU3RyaW5nKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBwb3N0QW5zd2VyKGhvbWV3b3JrX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8YW5zd2VyUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ2NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogaG9tZXdvcmtfaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZXdvcmtJRDogJzknLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyOiB0aGlzLmRhdGEuYW5zd2VyTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxhbnN3ZXJSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBlbnRyeUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muivpuaDhVxyXG4gICAgICAgIHRoaXMuZ2V0UXVlc3Rpb24odGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHt9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGJhY2tDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgYW5zd2VyTGlzdDogW10sXHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdLFxyXG4gICAgICAgICAgICBxdWVzdGlvbk51bTogMFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5nZXRIb21ld29yaygpLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25TdGVwcygpIHtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS5jaG9zZUxpc3RbMV0uY2hlY2tlZClcclxuICAgICAgICBsZXQgZmluaXNoZWQ6IGJvb2xlYW4gPSB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS51c2VyQW5zd2VyLmxlbmd0aCA9PSAwICYmICFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfor7fkvZznrZTvvIEnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBhcnJheUVxdWFsKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS51c2VyQW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS5jb3JyZWN0QW5zd2VyXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmFuc3dlckxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhOdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTnVtIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0gKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWujOaIkO+8jOWPkemAgWFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RBbnN3ZXIodGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaG9tZXdvcmtJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2hlY2tib3hDaGFuZ2UoZTogeyBkZXRhaWw6IHsgdmFsdWU6IGFueSB9IH0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS50eXBlID09IDApIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBbZS5kZXRhaWwudmFsdWVdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IHZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIGFycmF5RXF1YWwoYXJyYXkxOiBzdHJpbmdbXSwgYXJyYXkyOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFhcnJheTIpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKCFhcnJheTEpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9IGFycmF5Mi5sZW5ndGgpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGxldCB0ZW1wQXJyMSA9IGFycmF5MS5zb3J0KClcclxuICAgIGxldCB0ZW1wQXJyMiA9IGFycmF5Mi5zb3J0KClcclxuICAgIC8vY29uc29sZS5sb2codGVtcEFycjEsIHRlbXBBcnIyKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wQXJyMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0ZW1wQXJyMVtpXSAhPSB0ZW1wQXJyMltpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbiJdfQ==