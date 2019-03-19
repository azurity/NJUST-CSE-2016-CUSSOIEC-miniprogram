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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBWSxFQUFFO1FBQ3hCLFVBQVUsRUFBWSxFQUFFO1FBQ3hCLFdBQVcsRUFBRSxDQUFDO1FBQ2QsWUFBWSxFQUFrQixFQUFFO1FBQ2hDLFlBQVksRUFBa0IsRUFBRTtRQUNoQyxPQUFPLEVBQUUsQ0FBQztRQUNWLE9BQU8sRUFBRSxJQUFJO0tBQ2hCO0lBQ0QsTUFBTTtRQUFOLGlCQVdDO1FBVEcsSUFBSSxDQUFDLFdBQVcsRUFBRTthQUNiLElBQUksQ0FBQztZQUNGLEtBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsTUFBTTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0gsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNyRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyx1QkFBdUI7Z0NBQ3RELE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRTtvQ0FJRixRQUFRLEVBQUUsR0FBRztvQ0FDYixRQUFRLEVBQUUsY0FBYztvQ0FDeEIsT0FBTyxFQUFFLFFBQVE7aUNBQ3BCO2dDQUNELE9BQU8sRUFBRSxVQUFDLEVB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S0FBSyxDQUFBO0lBQ3pCLElBQUksQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFFekIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNO1FBQUUsT0FBTyxLQUFLLENBQUE7SUFFaEQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzVCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUU1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQge1xyXG4gICAgSG9tZXdvcmtJdGVtLFxyXG4gICAgUXVlc3Rpb25JdGVtLFxyXG4gICAgQ2hvc2VJdGVtLFxyXG4gICAgaG9tZXdvcmtSZXMsXHJcbiAgICBhbnN3ZXJSZXMsXHJcbiAgICBxdWVzdGlvblJlc1xyXG59IGZyb20gJy4uLy4uL3V0aWxzL2hvbWV3b3JrL2hvbWV3b3JrUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGlzSW5MaXN0OiBmYWxzZSxcclxuICAgICAgICBhbnN3ZXJMaXN0OiA8c3RyaW5nW10+W10sXHJcbiAgICAgICAgdXNlckFuc3dlcjogPHN0cmluZ1tdPltdLFxyXG4gICAgICAgIHF1ZXN0aW9uTnVtOiAwLFxyXG4gICAgICAgIGhvbWV3b3JrTGlzdDogPEhvbWV3b3JrSXRlbVtdPltdLFxyXG4gICAgICAgIHF1ZXN0aW9uTGlzdDogPFF1ZXN0aW9uSXRlbVtdPltdLFxyXG4gICAgICAgIGxpc3ROdW06IDAsXHJcbiAgICAgICAgbG9hZGluZzogdHJ1ZVxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJrliJfooahcclxuICAgICAgICB0aGlzLmdldEhvbWV3b3JrKClcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBsb2FkaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRIb21ld29yaygpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8aG9tZXdvcmtSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmtfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdXJzZUlEOiB3eC5nZXRTdG9yYWdlU3luYygnQ291cnNlRGV0YWlsJykuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBwZXJzb25JRDogYXBwLmdsb2JhbERhdGEucGVyc29uSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGVnZTogYXBwLmdsb2JhbERhdGEuY29sbGVnZVxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYxMDY4NDA0MDcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aG9tZXdvcmtSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiByZXMucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFF1ZXN0aW9uKGhvbWV3b3JrOiBIb21ld29ya0l0ZW0pIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8cXVlc3Rpb25SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogaG9tZXdvcmsuaG9tZXdvcmtJRCxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwNDA3JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJ1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSUQ6ICc5J1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPHF1ZXN0aW9uUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgbGV0IHF1ZXN0aW9uTGlzdCA9IHJlcy5yZXN1bHQuc29ydChmdW5jdGlvbihhOiBRdWVzdGlvbkl0ZW0sIGI6IFF1ZXN0aW9uSXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEucXVlc3Rpb25JbmRleCkgLSBwYXJzZUludChiLnF1ZXN0aW9uSW5kZXgpXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGZvciAobGV0IGl0IG9mIHF1ZXN0aW9uTGlzdCkge1xyXG4gICAgICAgICAgICAgICAgaXQuY2hvc2VMaXN0ID0gaXQuY2hvc2VMaXN0LnNvcnQoZnVuY3Rpb24oYTogQ2hvc2VJdGVtLCBiOiBDaG9zZUl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5jaG9zZUluZGV4KSAtIHBhcnNlSW50KGIuY2hvc2VJbmRleClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGhvbWV3b3JrLmlzRmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlc3Rpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBxdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbkxpc3RbaV0udXNlckFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbkxpc3RbaV0uY29ycmVjdEFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBpc0luTGlzdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogcXVlc3Rpb25MaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIHBvc3RBbnN3ZXIoaG9tZXdvcmtfaWQ6IHN0cmluZykge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxhbnN3ZXJSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmtfYW5zd2VyJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvdXJzZUlEOiB3eC5nZXRTdG9yYWdlU3luYygnY291cnNlRGV0YWlsJykuZGF0YS5jb3Vyc2VJRCxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya0lEOiBob21ld29ya19pZCxcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwNDA3JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJyxcclxuICAgICAgICAgICAgICAgICAgICAvLyBob21ld29ya0lEOiAnOScsXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXI6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGFuc3dlclJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgfSxcclxuICAgIGVudHJ5Q2FyZChlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxpc3ROdW06IGUuY3VycmVudFRhcmdldC5pZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia6K+m5oOFXHJcbiAgICAgICAgdGhpcy5nZXRRdWVzdGlvbih0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXSlcclxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge30pXHJcbiAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgYmFja0NhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbnN3ZXJMaXN0OiBbXSxcclxuICAgICAgICAgICAgdXNlckFuc3dlcjogW10sXHJcbiAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiAwXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLmdldEhvbWV3b3JrKCkuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24pXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBxdWVzdGlvblN0ZXBzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS5jaG9zZUxpc3RbMV0uY2hlY2tlZClcclxuICAgICAgICBsZXQgZmluaXNoZWQ6IGJvb2xlYW4gPSB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS51c2VyQW5zd2VyLmxlbmd0aCA9PSAwICYmICFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6ICfor7fkvZznrZTvvIEnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMDBcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICAgICBhcnJheUVxdWFsKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS51c2VyQW5zd2VyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS5jb3JyZWN0QW5zd2VyXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmFuc3dlckxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhOdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTnVtIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0gKyAxLFxyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWujOaIkO+8jOWPkemAgWFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvc3RBbnN3ZXIodGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaG9tZXdvcmtJRClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2hlY2tib3hDaGFuZ2UoZTogeyBkZXRhaWw6IHsgdmFsdWU6IGFueSB9IH0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS50eXBlID09IDApIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBbZS5kZXRhaWwudmFsdWVdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IHZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIGFycmF5RXF1YWwoYXJyYXkxOiBzdHJpbmdbXSwgYXJyYXkyOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFhcnJheTIpIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKCFhcnJheTEpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9IGFycmF5Mi5sZW5ndGgpIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGxldCB0ZW1wQXJyMSA9IGFycmF5MS5zb3J0KClcclxuICAgIGxldCB0ZW1wQXJyMiA9IGFycmF5Mi5zb3J0KClcclxuICAgIC8vY29uc29sZS5sb2codGVtcEFycjEsIHRlbXBBcnIyKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wQXJyMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0ZW1wQXJyMVtpXSAhPSB0ZW1wQXJyMltpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcbiJdfQ==