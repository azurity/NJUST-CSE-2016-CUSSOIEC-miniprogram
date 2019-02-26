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
                    return parseInt(a.questionID) - parseInt(b.questionID);
                })
            });
            for (var n = 0; n < _this.data.questionList.length; n++) {
                _this.data.questionList[n].choseList = _this.data.questionList[n].choseList.sort(function (a, b) {
                    return parseInt(a.choseID) - parseInt(b.choseID);
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
                    Promise.all([this.postAnswer(this.data.homeworkList[this.data.listNum].homeworkID)])
                        .then(function (reason) {
                        console.log(reason);
                    }).catch(function (reason) {
                        console.log(reason);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFjNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsS0FBSztRQUNmLFVBQVUsRUFBRSxFQUFFO1FBQ2QsVUFBVSxFQUFFLEVBQUU7UUFDZCxXQUFXLEVBQUUsQ0FBQztRQUNkLE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxNQUFNO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUNLLFdBQVc7Ozs7OzRCQUNILFdBQU0sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDckQsRUFBRSxDQUFDLE9BQU8sQ0FBQztnQ0FDUCxHQUFHLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsdUJBQXVCO2dDQUN0RCxNQUFNLEVBQUUsS0FBSztnQ0FDYixJQUFJLEVBQUU7b0NBSUYsUUFBUSxFQUFFLEdBQUc7b0NBQ2IsUUFBUSxFQUFFLGNBQWM7b0NBQ3hCLE9BQU8sRUFBRSxRQUFRO2lDQUNwQjtnQ0FDRCxPQUFPLEVBQUUsVUFBQyxFQUFRO3dDQUFOLGNBQUk7b0NBQ1osT0FBTyxDQUFjLElBQUksQ0FBQyxDQUFBO2dDQUM5QixDQUFDO2dDQUNELElBQUksRUFBRSxNQUFNOzZCQUNmLENBQUMsQ0FBQTt3QkFDTixDQUFDLENBQUMsRUFBQTs7d0JBakJFLEdBQUcsR0FBRyxTQWlCUjt3QkFDRixJQUFJLEdBQUcsQ0FBQyxPQUFPLEVBQUU7NEJBQ2IsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDVCxZQUFZLEVBQUUsR0FB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QUMsSUFBSSxJQUFJLENBQUMsRUFBRTtZQUN6RCxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFVBQVUsRUFBRSxLQUFLO1NBQ3BCLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSixDQUFDLENBQUE7QUFFRixTQUFTLFVBQVUsQ0FBQyxNQUFnQixFQUFFLE1BQWdCO0lBQ2xELElBQUksQ0FBQyxNQUFNO1FBQ1AsT0FBTyxLQUFLLENBQUE7SUFDaEIsSUFBSSxDQUFDLE1BQU07UUFDUCxPQUFPLEtBQUssQ0FBQTtJQUVoQixJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU07UUFDOUIsT0FBTyxLQUFLLENBQUE7SUFFaEIsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzVCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMvQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDNUIsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBob21ld29ya1JlcywgYW5zd2VyUmVzLCBxdWVzdGlvblJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2hvbWV3b3JrL2hvbWV3b3JrUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuaW50ZXJmYWNlIHF1ZXN0aW9uSSB7XHJcbiAgICBxdWVzdGlvbklEOiBzdHJpbmdcclxufVxyXG5cclxudHlwZSBxdWVzdGlvbiA9IHF1ZXN0aW9uSVxyXG5cclxuaW50ZXJmYWNlIGNob3NlSSB7XHJcbiAgICBjaG9zZUlEOiBzdHJpbmdcclxufVxyXG5cclxudHlwZSBjaG9zZSA9IGNob3NlSVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGlzSW5MaXN0OiBmYWxzZSxcclxuICAgICAgICBhbnN3ZXJMaXN0OiBbXSxcclxuICAgICAgICB1c2VyQW5zd2VyOiBbXSxcclxuICAgICAgICBxdWVzdGlvbk51bTogMCxcclxuICAgICAgICBsaXN0TnVtOiAwXHJcbiAgICB9LFxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIC8vIOiOt+WPluS9nOS4muWIl+ihqFxyXG4gICAgICAgIFByb21pc2UuYWxsKFt0aGlzLmdldEhvbWV3b3JrKCldKVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldEhvbWV3b3JrKCkge1xyXG4gICAgICAgIGxldCByZXMgPSBhd2FpdCBuZXcgUHJvbWlzZTxob21ld29ya1Jlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29ya19saXN0JyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdDb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBlcnNvbklEOiBhcHAuZ2xvYmFsRGF0YS5wZXJzb25JRCxcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsZWdlOiBhcHAuZ2xvYmFsRGF0YS5jb2xsZWdlXHJcbiAgICAgICAgICAgICAgICAgICAgY291cnNlSUQ6ICczJyxcclxuICAgICAgICAgICAgICAgICAgICBwZXJzb25JRDogJzkxNjEwNjg0MDQwNycsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGVnZTogJ+WNl+S6rOeQhuW3peWkp+WtpidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxob21ld29ya1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBob21ld29ya0xpc3Q6IHJlcy5yZXN1bHQuaG9tZXdvcmtMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g5L2c5Lia5pyq6I635Y+W5oiQ5YqfXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldFF1ZXN0aW9uKGhvbWV3b3JrX2lkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8cXVlc3Rpb25SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBjb3Vyc2VJRDogd3guZ2V0U3RvcmFnZVN5bmMoJ0NvdXJzZURldGFpbCcpLmRhdGEuY291cnNlSUQsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZXdvcmtJRDogaG9tZXdvcmtfaWRcclxuICAgICAgICAgICAgICAgICAgICBjb3Vyc2VJRDogJzMnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBlcnNvbklEOiAnOTE2MTA2ODQwNDA3JyxcclxuICAgICAgICAgICAgICAgICAgICBjb2xsZWdlOiAn5Y2X5Lqs55CG5bel5aSn5a2mJyxcclxuICAgICAgICAgICAgICAgICAgICBob21ld29ya0lEOiAnOSdcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcG9zdEFuc3dlcihob21ld29ya19pZDogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGFuc3dlclJlcz4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcclxuICAgICAgICAgICAgICAgIHVybDogYXBwLmdsb2JhbERhdGEuaG9zdE5hbWUgKyAnL2NvdXJzZS9ob21ld29ya19hbnN3ZXInLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcGVyc29uSUQ6IGFwcC5nbG9iYWxEYXRhLnBlcnNvbklELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbGxlZ2U6IGFwcC5nbG9iYWxEYXRhLmNvbGxlZ2UsXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY291cnNlSUQ6IHd4LmdldFN0b3JhZ2VTeW5jKCdjb3Vyc2VEZXRhaWwnKS5kYXRhLmNvdXJzZUlELFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSUQ6IGhvbWV3b3JrX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvdXJzZUlEOiAnMycsXHJcbiAgICAgICAgICAgICAgICAgICAgcGVyc29uSUQ6ICc5MTYxMDY4NDA0MDcnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxlZ2U6ICfljZfkuqznkIblt6XlpKflraYnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbWV3b3JrSUQ6ICc5JyxcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8YW5zd2VyUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgZW50cnlDYXJkKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbGlzdE51bTogZS5jdXJyZW50VGFyZ2V0LmlkXHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyDojrflj5bkvZzkuJror6bmg4VcclxuICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5nZXRRdWVzdGlvbih0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5ob21ld29ya0lEKV0pXHJcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3Quc29ydChmdW5jdGlvbihhOiBxdWVzdGlvbiwgYjogcXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChhLnF1ZXN0aW9uSUQpIC0gcGFyc2VJbnQoYi5xdWVzdGlvbklEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3Rbbl0uY2hvc2VMaXN0ID0gdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtuXS5jaG9zZUxpc3Quc29ydChmdW5jdGlvbihhOiBjaG9zZSwgYjogY2hvc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludChhLmNob3NlSUQpIC0gcGFyc2VJbnQoYi5jaG9zZUlEKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25MaXN0OiB0aGlzLmRhdGEucXVlc3Rpb25MaXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLnVzZXJBbnN3ZXIuaW5kZXhPZihqLnRvU3RyaW5nKCkpID49IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IDFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jb3JyZWN0QW5zd2VyLmluZGV4T2Yoai50b1N0cmluZygpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgICAgIC5jYXRjaCgpXHJcbiAgICB9LFxyXG4gICAgYmFja0NhcmQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IGZhbHNlXHJcbiAgICAgICAgfSlcclxuICAgICAgICB0aGlzLm9uTG9hZCgpXHJcbiAgICB9LFxyXG4gICAgcXVlc3Rpb25TdGVwcygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmRhdGEucXVlc3Rpb25MaXN0W3RoaXMuZGF0YS5xdWVzdGlvbk51bV0uY2hvc2VMaXN0WzFdLmNoZWNrZWQpXHJcbiAgICAgICAgbGV0IGZpbmlzaGVkOiBib29sZWFuID0gdGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaXNGaW5pc2hlZFxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEudXNlckFuc3dlci5sZW5ndGggPT0gMCAmJiAhZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35L2c562U77yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5RXF1YWwodGhpc1xyXG4gICAgICAgICAgICAgICAgLmRhdGEudXNlckFuc3dlciwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNvcnJlY3RBbnN3ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hbnN3ZXJMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4TnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb3JyZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSArIDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWujOaIkO+8jOWPkemAgWFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChbdGhpcy5wb3N0QW5zd2VyKHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmhvbWV3b3JrSUQpXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbilcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdGlvbk51bTogMFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogW11cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJhY2tDYXJkKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3eC5wYWdlU2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IDBcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGNoZWNrYm94Q2hhbmdlKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnY2hlY2tib3jlj5HnlJ9jaGFuZ2Xkuovku7bvvIzmkLrluKZ2YWx1ZeWAvOS4uu+8micsIGUuZGV0YWlsLnZhbHVlKVxyXG4gICAgICAgIGxldCB2YWx1ZSA9IGUuZGV0YWlsLnZhbHVlXHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS50eXBlID09IDApIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBbZS5kZXRhaWwudmFsdWVdXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IHZhbHVlXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIGFycmF5RXF1YWwoYXJyYXkxOiBzdHJpbmdbXSwgYXJyYXkyOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFhcnJheTIpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoIWFycmF5MSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPSBhcnJheTIubGVuZ3RoKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGxldCB0ZW1wQXJyMSA9IGFycmF5MS5zb3J0KClcclxuICAgIGxldCB0ZW1wQXJyMiA9IGFycmF5Mi5zb3J0KClcclxuICAgIGNvbnNvbGUubG9nKHRlbXBBcnIxLCB0ZW1wQXJyMilcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGVtcEFycjEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodGVtcEFycjFbaV0gIT0gdGVtcEFycjJbaV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWVcclxufVxyXG4iXX0=