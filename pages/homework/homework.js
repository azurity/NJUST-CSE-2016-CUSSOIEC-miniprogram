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
                        this.data.questionList[i].choseList[j].checked = true;
                    }
                    else {
                        this.data.questionList[i].choseList[j].checked = false;
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
        if (this.data.questionNum == this.data.questionList.length - 1) {
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
            this.backCard();
        }
        if (this.data.userAnswer.length == 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxZQUFZLEVBQUUsQ0FBQztnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLElBQUk7YUFDbkIsRUFBRTtnQkFDQyxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUM7UUFDRixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FBSztxQkFDZCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxHQUFHO2dCQUNsQixVQUFVLEVBQUUsR0FBRzthQUNsQixFQUFFO2dCQUNDLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FB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QUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQTtTQUNkO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBob21ld29ya1JlcywgYW5zd2VyUmVzIH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9tZXdvcmsvaG9tZXdvcmtSZXMnXHJcblxyXG5jb25zdCBhcHAgPSBnZXRBcHA8SU15QXBwPigpXHJcblxyXG5QYWdlKHtcclxuICAgIGRhdGE6IHtcclxuICAgICAgICBiYXNpY3M6IDAsXHJcbiAgICAgICAgaG9tZXdvcmtMaXN0OiBbe1xyXG4gICAgICAgICAgICBuYW1lOiAn5pWw5a2X6Z+z6aKR55CG6K66JyxcclxuICAgICAgICAgICAgaG9tZXdvcmtJRDogJzEyMzQnLFxyXG4gICAgICAgICAgICBpc0ZpbmlzaGVkOiB0cnVlXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBuYW1lOiAn5pWw5a2X6KeG6aKR5L+h5Y+35aSE55CGJyxcclxuICAgICAgICAgICAgaG9tZXdvcmtJRDogJzEyMzQ1JyxcclxuICAgICAgICAgICAgaXNGaW5pc2hlZDogZmFsc2VcclxuICAgICAgICB9XSxcclxuICAgICAgICBpc0luTGlzdDogZmFsc2UsXHJcbiAgICAgICAgcXVlc3Rpb25MaXN0OiBbe1xyXG4gICAgICAgICAgICB0eXBlOiAwLFxyXG4gICAgICAgICAgICBxdWVzdGlvbjogJ+i/meaYr+WNlemAiemimCcsXHJcbiAgICAgICAgICAgIGltYWdlVVJMOiAnJyxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4gCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS6jCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4iSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueWbmydcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6ICcwJyxcclxuICAgICAgICAgICAgdXNlckFuc3dlcjogJzEnXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBxdWVzdGlvbjogJ+i/meaYr+WkmumAiemimCcsXHJcbiAgICAgICAgICAgIGltYWdlVVJMOiAnJyxcclxuICAgICAgICAgICAgY2hvc2VMaXN0OiBbe1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4gCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS6jCdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS4iSdcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueWbmydcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogJ+mAiemhueS6lCdcclxuICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgIGNvcnJlY3RBbnN3ZXI6IFsnMScsICcyJ10sXHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFsnMScsICcyJ11cclxuICAgICAgICB9LHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgcXVlc3Rpb246ICfov5nmmK/lpJrpgInpopgyJyxcclxuICAgICAgICAgICAgaW1hZ2VVUkw6ICcnLFxyXG4gICAgICAgICAgICBjaG9zZUxpc3Q6IFt7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YCJ6aG55LiAJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YCJ6aG55LqMJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YCJ6aG55LiJJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YCJ6aG55ZubJ1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiAn6YCJ6aG55LqUJ1xyXG4gICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgY29ycmVjdEFuc3dlcjogWycxJywgJzInXSxcclxuICAgICAgICAgICAgdXNlckFuc3dlcjogWycxJywgJzInXVxyXG4gICAgICAgIH1dLFxyXG4gICAgICAgIGFuc3dlckxpc3Q6IFtdLFxyXG4gICAgICAgIHVzZXJBbnN3ZXI6IFtdLFxyXG4gICAgICAgIHF1ZXN0aW9uTnVtOiAwLFxyXG4gICAgICAgIGxpc3ROdW06IDBcclxuICAgIH0sXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia5YiX6KGoXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZ2V0SG9tZXdvcmsoKSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IGF3YWl0IG5ldyBQcm9taXNlPGhvbWV3b3JrUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrJyxcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8g5LuOY291cnNlRGV0YWls5Lyg5p2l55qEY291cnNlSURcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxob21ld29ya1Jlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcG9zdEFuc3dlcigpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8YW5zd2VyUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuaWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5pZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyDku45jb3Vyc2VEZXRhaWzkvKDmnaXnmoRjb3Vyc2VJRFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyOiB0aGlzLmRhdGEuYW5zd2VyTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxhbnN3ZXJSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiByZXNcclxuICAgIH0sXHJcbiAgICBlbnRyeUNhcmQoZTogd3guVGFwRXZlbnQpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJror6bmg4VcclxuICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICBsaXN0TnVtOiBlLmN1cnJlbnRUYXJnZXQuaWRcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEuaG9tZXdvcmtMaXN0W3RoaXMuZGF0YS5saXN0TnVtXS5pc0ZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0luQXJyYXkodGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS51c2VyQW5zd2VyLCBqLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3Rbal0uY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGJhY2tDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5vbkxvYWQoKVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uU3RlcHMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNob3NlTGlzdFsxXS5jaGVja2VkKVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gPT0gdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgIC8vIOWujOaIkOS9nOS4muaPkOS6pFxyXG4gICAgICAgICAgICAvLyDpobXpnaLot7Povazov5Tlm55cclxuICAgICAgICAgICAgaWYgKGFycmF5RXF1YWwodGhpc1xyXG4gICAgICAgICAgICAgICAgLmRhdGEudXNlckFuc3dlciwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNvcnJlY3RBbnN3ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hbnN3ZXJMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4TnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb3JyZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgdGhpcy5iYWNrQ2FyZCgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEudXNlckFuc3dlci5sZW5ndGg9PTApIHtcclxuICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiAn6K+35L2c562U77yBJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAwXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFycmF5RXF1YWwodGhpc1xyXG4gICAgICAgICAgICAgICAgLmRhdGEudXNlckFuc3dlciwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNvcnJlY3RBbnN3ZXIpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5hbnN3ZXJMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4TnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0sXHJcbiAgICAgICAgICAgICAgICAgICAgaXNDb3JyZWN0OiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiB0aGlzLmRhdGEudXNlckFuc3dlclxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgYW5zd2VyTGlzdDogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLmFuc3dlckxpc3QpXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmRhdGEucXVlc3Rpb25OdW0gPCB0aGlzLmRhdGEucXVlc3Rpb25MaXN0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25OdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSArIDFcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHVzZXJBbnN3ZXI6IFtdXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2hlY2tib3hDaGFuZ2UoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja2JveOWPkeeUn2NoYW5nZeS6i+S7tu+8jOaQuuW4pnZhbHVl5YC85Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXNlckFuc3dlcjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gYXJyYXlFcXVhbChhcnJheTE6IEFycmF5PGFueT4sIGFycmF5MjogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFhcnJheTIpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoIWFycmF5MSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPSBhcnJheTIubGVuZ3RoKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJyYXkxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnJheTFbaV0gaW5zdGFuY2VvZiBBcnJheSAmJiBhcnJheTJbaV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBpZiAoIWFycmF5MVtpXS5lcXVhbHMoYXJyYXkyW2ldKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJyYXkxW2ldICE9IGFycmF5MltpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luQXJyYXkoYXJyYXk6IEFycmF5PGFueT4sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IGFycmF5W2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbn1cclxuIl19