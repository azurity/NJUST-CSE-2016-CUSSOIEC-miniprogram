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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmtUZWFjaGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZXdvcmtUZWFjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQVUsQ0FBQTtBQWM1QixJQUFJLENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDRixNQUFNLEVBQUUsQ0FBQztRQUNULFFBQVEsRUFBRSxLQUFLO1FBQ2YsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsRUFBRTtRQUNkLFdBQVcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxFQUFFLENBQUM7S0FDYjtJQUNELE1BQU07UUFFRixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ0ssV0FBVzs7Ozs7NEJBQ0gsV0FBTSxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNOzRCQUNyRCxFQUFFLENBQUMsT0FBTyxDQUFDO2dDQUNQLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsR0FBRyx1QkFBdUI7Z0NBQ3RELE1BQU0sRUFBRSxLQUFLO2dDQUNiLElBQUksRUFBRTtvQ0FJRixRQUFRLEVBQUUsR0FBRztvQ0FDYixRQUFRLEVBQUUsY0FBYztvQ0FDeEIsT0FBTyxFQUFFLFFBQVE7aUNBQ3BCO2dDQUNELE9BQU8sRUFBRSxVQUFDLEVBQVE7d0NBQU4sY0FBSTtvQ0FDWixPQUFPLENBQWMsSUFBSSxDQUFDLENBQUE7Z0NBQzlCLENBQUM7Z0NBQ0QsSUFBSSxFQUFFLE1BQU07NkJBQ2YsQ0FBQyxDQUFBO3dCQUNOLENBQUMsQ0FBQyxFQUFBOzt3QkFqQkUsR0FBRyxHQUFHLFNBaUJSO3dCQUNGLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTs0QkFDYixJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUNU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QUFDLE1BQU07YUFDNUMsQ0FBQyxDQUFBO1NBQ0w7YUFBTTtZQUNILElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1QsU0FBUyxFQUFFLElBQUk7YUFDbEIsQ0FBQyxDQUFBO1NBQ0w7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1Qsa0JBQWtCLEVBQUUsSUFBSTtTQUMzQixDQUFDLENBQUE7SUFDTixDQUFDO0NBQ0osQ0FBQyxDQUFBO0FBRUYsU0FBUyxVQUFVLENBQUMsTUFBZ0IsRUFBRSxNQUFnQjtJQUNsRCxJQUFJLENBQUMsTUFBTTtRQUNQLE9BQU8sS0FBSyxDQUFBO0lBQ2hCLElBQUksQ0FBQyxNQUFNO1FBQ1AsT0FBTyxLQUFLLENBQUE7SUFFaEIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNO1FBQzlCLE9BQU8sS0FBSyxDQUFBO0lBRWhCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM1QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzVCLE9BQU8sS0FBSyxDQUFBO1NBQ2Y7S0FDSjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuaW1wb3J0IHsgaG9tZXdvcmtSZXMsIHF1ZXN0aW9uUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9tZXdvcmsvaG9tZXdvcmtSZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5pbnRlcmZhY2UgcXVlc3Rpb25JIHtcclxuICAgIHF1ZXN0aW9uSW5kZXg6IHN0cmluZ1xyXG59XHJcblxyXG50eXBlIHF1ZXN0aW9uID0gcXVlc3Rpb25JXHJcblxyXG5pbnRlcmZhY2UgY2hvc2VJIHtcclxuICAgIGNob3NlSW5kZXg6IHN0cmluZ1xyXG59XHJcblxyXG50eXBlIGNob3NlID0gY2hvc2VJXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBiYXNpY3M6IDAsXHJcbiAgICAgICAgaXNJbkxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIGFuc3dlckxpc3Q6IFtdLFxyXG4gICAgICAgIHVzZXJBbnN3ZXI6IFtdLFxyXG4gICAgICAgIHF1ZXN0aW9uTnVtOiAwLFxyXG4gICAgICAgIGxpc3ROdW06IDBcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia5YiX6KGoXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SG9tZXdvcmsoKV0pXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0SG9tZXdvcmsoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGhvbWV3b3JrUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2xpc3QnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2VcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwNDA3JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6ICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoPGhvbWV3b3JrUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAocmVzLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGhvbWV3b3JrTGlzdDogcmVzLnJlc3VsdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muWIl+ihqOacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRRdWVzdGlvbihob21ld29ya19pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPHF1ZXN0aW9uUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSUQ6IGhvbWV3b3JrX2lkXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpicsXHJcbiAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtJRDogJzknXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8cXVlc3Rpb25SZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiByZXMucmVzdWx0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGVudHJ5Q2FyZChlOiB3eC5UYXBFdmVudCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGxpc3ROdW06IGUuY3VycmVudFRhcmdldC5pZFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia6K+m5oOFXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuZ2V0UXVlc3Rpb24odGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaG9tZXdvcmtJRCldKVxyXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiB0aGlzLmRhdGEucXVlc3Rpb25MaXN0LnNvcnQoZnVuY3Rpb24oYTogcXVlc3Rpb24sIGI6IHF1ZXN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5xdWVzdGlvbkluZGV4KSAtIHBhcnNlSW50KGIucXVlc3Rpb25JbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W25dLmNob3NlTGlzdCA9IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3Rbbl0uY2hvc2VMaXN0LnNvcnQoZnVuY3Rpb24oYTogY2hvc2UsIGI6IGNob3NlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoYS5jaG9zZUluZGV4KSAtIHBhcnNlSW50KGIuY2hvc2VJbmRleClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaXNGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS51c2VyQW5zd2VyLmluZGV4T2Yoai50b1N0cmluZygpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY29ycmVjdEFuc3dlci5pbmRleE9mKGoudG9TdHJpbmcoKSkgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzSW5MaXN0OiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGJhY2tDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgUHJvbWlzZS5hbGwoW3RoaXMuZ2V0SG9tZXdvcmsoKV0pXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25TdGVwcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W3RoaXMuZGF0YS5xdWVzdGlvbk51bV0uY2hvc2VMaXN0WzFdLmNoZWNrZWQpXHJcbiAgICAgICAgbGV0IGZpbmlzaGVkOiBib29sZWFuID0gdGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaXNGaW5pc2hlZFxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEudXNlckFuc3dlci5sZW5ndGggPT0gMCAmJiAhZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35L2c562U77yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5RXF1YWwodGhpc1xyXG4gICAgICAgICAgICAgICAgLmRhdGEudXNlckFuc3dlciwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNvcnJlY3RBbnN3ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hbnN3ZXJMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4TnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb3JyZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSArIDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWujOaIkO+8jOWPkemAgWFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5wb3N0QW5zd2VyKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmhvbWV3b3JrSUQpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiB0aGlzLmRhdGEuaG9tZXdvcmtMaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd3gucGFnZVNjcm9sbFRvKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcblxyXG4gICAgLy8gTGlzdFRvdWNo6Kem5pG45byA5aeLXHJcbiAgICBMaXN0VG91Y2hTdGFydChlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgTGlzdFRvdWNoU3RhcnQ6IGUudG91Y2hlc1swXS5wYWdlWFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExpc3RUb3VjaOiuoeeul+aWueWQkVxyXG4gICAgTGlzdFRvdWNoTW92ZShlKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgTGlzdFRvdWNoRGlyZWN0aW9uOiBlLnRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLmRhdGEuTGlzdFRvdWNoU3RhcnQgPiAwID8gJ3JpZ2h0JyA6ICdsZWZ0J1xyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExpc3RUb3VjaOiuoeeul+a7muWKqFxyXG4gICAgTGlzdFRvdWNoRW5kKGUpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhLkxpc3RUb3VjaERpcmVjdGlvbiA9PSAnbGVmdCcpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIG1vZGFsTmFtZTogZS5jdXJyZW50VGFyZ2V0LmRhdGFzZXQudGFyZ2V0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIG1vZGFsTmFtZTogbnVsbFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBMaXN0VG91Y2hEaXJlY3Rpb246IG51bGxcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gYXJyYXlFcXVhbChhcnJheTE6IHN0cmluZ1tdLCBhcnJheTI6IHN0cmluZ1tdKTogYm9vbGVhbiB7XHJcbiAgICBpZiAoIWFycmF5MilcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIGlmICghYXJyYXkxKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGlmIChhcnJheTEubGVuZ3RoICE9IGFycmF5Mi5sZW5ndGgpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgbGV0IHRlbXBBcnIxID0gYXJyYXkxLnNvcnQoKVxyXG4gICAgbGV0IHRlbXBBcnIyID0gYXJyYXkyLnNvcnQoKVxyXG4gICAgY29uc29sZS5sb2codGVtcEFycjEsIHRlbXBBcnIyKVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0ZW1wQXJyMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmICh0ZW1wQXJyMVtpXSAhPSB0ZW1wQXJyMltpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59Il19