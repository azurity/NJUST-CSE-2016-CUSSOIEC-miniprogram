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
                                url: app.globalData.hostName + '/course/homework_list',
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
    getQuestion: function () {
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
                        this.data.questionList[i].choseList[j].checked = 1;
                    }
                    else {
                        this.data.questionList[i].choseList[j].checked = 0;
                    }
                    if (isInArray(this.data.questionList[i].correctAnswer, j.toString())) {
                        this.data.questionList[i].choseList[j].checked = 2;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZXdvcmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21ld29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFFNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxFQUFFLENBQUM7UUFDVCxZQUFZLEVBQUUsQ0FBQztnQkFDWCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsVUFBVSxFQUFFLElBQUk7YUFDbkIsRUFBRTtnQkFDQyxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLFVBQVUsRUFBRSxLQUFLO2FBQ3BCLENBQUM7UUFDRixRQUFRLEVBQUUsS0FBSztRQUNmLFlBQVksRUFBRSxDQUFDO2dCQUNYLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FBSztxQkFDZCxDQUFDO2dCQUNGLGFBQWEsRUFBRSxHQUFHO2dCQUNsQixVQUFVLEVBQUUsR0FBRzthQUNsQixFQUFFO2dCQUNDLElBQUksRUFBRSxDQUFDO2dCQUNQLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixRQUFRLEVBQUUsRUFBRTtnQkFDWixTQUFTLEVBQUUsQ0FBQzt3QkFDUixJQUFJLEVBQUUsS0FBSztxQkFDZCxFQUFFO3dCQUNDLElBQUksRUFBRSxLQUFLO3FCQUNkLEVBQUU7d0JBQ0MsSUFBSSxFQUFFLEtBQUs7cUJBQ2QsRUFBRTt3QkFDQyxJQUFJLEVBQUUsS0FB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SyxFQUFFO1lBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxLQUFLLENBQUE7U0FDbkI7YUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDL0IsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsS0FBaUIsRUFBRSxLQUFVO0lBQzVDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQTtTQUNkO0tBQ0o7SUFDRCxPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSU15QXBwIH0gZnJvbSAnLi4vLi4vYXBwJ1xyXG5pbXBvcnQgeyBob21ld29ya1JlcywgYW5zd2VyUmVzLCBxdWVzdGlvblJlcyB9IGZyb20gJy4uLy4uL3V0aWxzL2hvbWV3b3JrL2hvbWV3b3JrUmVzJ1xyXG5cclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5cclxuUGFnZSh7XHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICAgYmFzaWNzOiAwLFxyXG4gICAgICAgIGhvbWV3b3JrTGlzdDogW3tcclxuICAgICAgICAgICAgbmFtZTogJ+aVsOWtl+mfs+mikeeQhuiuuicsXHJcbiAgICAgICAgICAgIGhvbWV3b3JrSUQ6ICcxMjM0JyxcclxuICAgICAgICAgICAgaXNGaW5pc2hlZDogdHJ1ZVxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgbmFtZTogJ+aVsOWtl+inhumikeS/oeWPt+WkhOeQhicsXHJcbiAgICAgICAgICAgIGhvbWV3b3JrSUQ6ICcxMjM0NScsXHJcbiAgICAgICAgICAgIGlzRmluaXNoZWQ6IGZhbHNlXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgaXNJbkxpc3Q6IGZhbHNlLFxyXG4gICAgICAgIHF1ZXN0aW9uTGlzdDogW3tcclxuICAgICAgICAgICAgdHlwZTogMCxcclxuICAgICAgICAgICAgcXVlc3Rpb246ICfov5nmmK/ljZXpgInpopgnLFxyXG4gICAgICAgICAgICBpbWFnZVVSTDogJycsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuownXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnlm5snXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiAnMCcsXHJcbiAgICAgICAgICAgIHVzZXJBbnN3ZXI6ICcxJ1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgdHlwZTogMSxcclxuICAgICAgICAgICAgcXVlc3Rpb246ICfov5nmmK/lpJrpgInpopgnLFxyXG4gICAgICAgICAgICBpbWFnZVVSTDogJycsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuownXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnlm5snXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkupQnXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBbJzEnLCAnMiddLFxyXG4gICAgICAgICAgICB1c2VyQW5zd2VyOiBbJzEnLCAnMiddXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICB0eXBlOiAxLFxyXG4gICAgICAgICAgICBxdWVzdGlvbjogJ+i/meaYr+WkmumAiemimDInLFxyXG4gICAgICAgICAgICBpbWFnZVVSTDogJycsXHJcbiAgICAgICAgICAgIGNob3NlTGlzdDogW3tcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIAnXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuownXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkuIknXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnlm5snXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIG5hbWU6ICfpgInpobnkupQnXHJcbiAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICBjb3JyZWN0QW5zd2VyOiBbJzEnLCAnMiddLFxyXG4gICAgICAgICAgICB1c2VyQW5zd2VyOiBbJzEnLCAnMiddXHJcbiAgICAgICAgfV0sXHJcbiAgICAgICAgYW5zd2VyTGlzdDogW10sXHJcbiAgICAgICAgdXNlckFuc3dlcjogW10sXHJcbiAgICAgICAgcXVlc3Rpb25OdW06IDAsXHJcbiAgICAgICAgbGlzdE51bTogMFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDojrflj5bkvZzkuJrliJfooahcclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRIb21ld29yaygpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8aG9tZXdvcmtSZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmtfbGlzdCcsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOS7jmNvdXJzZURldGFpbOS8oOadpeeahGNvdXJzZUlEXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3BlbmlkXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8aG9tZXdvcmtSZXM+ZGF0YSlcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3RcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIGlmIChyZXMuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmtMaXN0OiByZXMucmVzdWx0LmhvbWV3b3JrTGlzdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIOS9nOS4muacquiOt+WPluaIkOWKn1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBhc3luYyBnZXRRdWVzdGlvbigpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8cXVlc3Rpb25SZXM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgd3gucmVxdWVzdCh7XHJcbiAgICAgICAgICAgICAgICB1cmw6IGFwcC5nbG9iYWxEYXRhLmhvc3ROYW1lICsgJy9jb3Vyc2UvaG9tZXdvcmsnLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDku45jb3Vyc2VEZXRhaWzkvKDmnaXnmoRjb3Vyc2VJRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSURcclxuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaWRcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiAoeyBkYXRhIH0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxxdWVzdGlvblJlcz5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZhaWw6IHJlamVjdFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYgKHJlcy5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICBxdWVzdGlvbkxpc3Q6IHJlcy5yZXN1bHRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyDkvZzkuJrmnKrojrflj5bmiJDlip9cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgcG9zdEFuc3dlcigpIHtcclxuICAgICAgICBsZXQgcmVzID0gYXdhaXQgbmV3IFByb21pc2U8YW5zd2VyUmVzPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIHd4LnJlcXVlc3Qoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiBhcHAuZ2xvYmFsRGF0YS5ob3N0TmFtZSArICcvY291cnNlL2hvbWV3b3JrX2Fuc3dlcicsXHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuaWQ6IGFwcC5nbG9iYWxEYXRhLm9wZW5pZCxcclxuICAgICAgICAgICAgICAgICAgICAvLyDku45jb3Vyc2VEZXRhaWzkvKDmnaXnmoRjb3Vyc2VJRFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWV3b3JrSURcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlcjogdGhpcy5kYXRhLmFuc3dlckxpc3RcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogKHsgZGF0YSB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSg8YW5zd2VyUmVzPmRhdGEpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmVzXHJcbiAgICB9LFxyXG4gICAgZW50cnlDYXJkKGU6IHd4LlRhcEV2ZW50KSB7XHJcbiAgICAgICAgLy8g6I635Y+W5L2c5Lia6K+m5oOFXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgbGlzdE51bTogZS5jdXJyZW50VGFyZ2V0LmlkXHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZiAodGhpcy5kYXRhLmhvbWV3b3JrTGlzdFt0aGlzLmRhdGEubGlzdE51bV0uaXNGaW5pc2hlZCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZGF0YS5xdWVzdGlvbkxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jaG9zZUxpc3QubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNJbkFycmF5KHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0udXNlckFuc3dlciwgai50b1N0cmluZygpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEucXVlc3Rpb25MaXN0W2ldLmNob3NlTGlzdFtqXS5jaGVja2VkID0gMVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0luQXJyYXkodGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFtpXS5jb3JyZWN0QW5zd2VyLCBqLnRvU3RyaW5nKCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbaV0uY2hvc2VMaXN0W2pdLmNoZWNrZWQgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTGlzdDogdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgaXNJbkxpc3Q6IHRydWVcclxuICAgICAgICB9KVxyXG4gICAgfSxcclxuICAgIGJhY2tDYXJkKCkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgICAgICAgIGlzSW5MaXN0OiBmYWxzZVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgdGhpcy5vbkxvYWQoKVxyXG4gICAgfSxcclxuICAgIHF1ZXN0aW9uU3RlcHMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5kYXRhLnF1ZXN0aW9uTGlzdFt0aGlzLmRhdGEucXVlc3Rpb25OdW1dLmNob3NlTGlzdFsxXS5jaGVja2VkKVxyXG4gICAgICAgIGxldCBmaW5pc2hlZDogYm9vbGVhbiA9IHRoaXMuZGF0YS5ob21ld29ya0xpc3RbdGhpcy5kYXRhLmxpc3ROdW1dLmlzRmluaXNoZWRcclxuICAgICAgICBpZiAodGhpcy5kYXRhLnVzZXJBbnN3ZXIubGVuZ3RoID09IDAgJiYgIWZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+S9nOetlO+8gScsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbm9uZScsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwMFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhcnJheUVxdWFsKHRoaXNcclxuICAgICAgICAgICAgICAgIC5kYXRhLnVzZXJBbnN3ZXIsIHRoaXMuZGF0YS5xdWVzdGlvbkxpc3RbdGhpcy5kYXRhLnF1ZXN0aW9uTnVtXS5jb3JyZWN0QW5zd2VyKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhLmFuc3dlckxpc3QucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhOdW06IHRoaXMuZGF0YS5xdWVzdGlvbk51bSxcclxuICAgICAgICAgICAgICAgICAgICBpc0NvcnJlY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGEuYW5zd2VyTGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleE51bTogdGhpcy5kYXRhLnF1ZXN0aW9uTnVtLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQ29ycmVjdDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlckFuc3dlcjogdGhpcy5kYXRhLnVzZXJBbnN3ZXJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgIGFuc3dlckxpc3Q6IHRoaXMuZGF0YS5hbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5hbnN3ZXJMaXN0KVxyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLnF1ZXN0aW9uTnVtIDwgdGhpcy5kYXRhLnF1ZXN0aW9uTGlzdC5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiB0aGlzLmRhdGEucXVlc3Rpb25OdW0gKyAxXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICB1c2VyQW5zd2VyOiBbXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghZmluaXNoZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyDlrozmiJDvvIzlj5HpgIFhbnN3ZXJMaXN0XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uTnVtOiAwXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgICAgICAgICBhbnN3ZXJMaXN0OiBbXVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIHRoaXMuYmFja0NhcmQoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHd4LnBhZ2VTY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogMFxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgY2hlY2tib3hDaGFuZ2UoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja2JveOWPkeeUn2NoYW5nZeS6i+S7tu+8jOaQuuW4pnZhbHVl5YC85Li677yaJywgZS5kZXRhaWwudmFsdWUpXHJcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICAgICAgdXNlckFuc3dlcjogZS5kZXRhaWwudmFsdWVcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gYXJyYXlFcXVhbChhcnJheTE6IEFycmF5PGFueT4sIGFycmF5MjogQXJyYXk8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgaWYgKCFhcnJheTIpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoIWFycmF5MSlcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuXHJcbiAgICBpZiAoYXJyYXkxLmxlbmd0aCAhPSBhcnJheTIubGVuZ3RoKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJyYXkxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgIGlmIChhcnJheTFbaV0gaW5zdGFuY2VvZiBBcnJheSAmJiBhcnJheTJbaV0gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBpZiAoIWFycmF5MVtpXS5lcXVhbHMoYXJyYXkyW2ldKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYXJyYXkxW2ldICE9IGFycmF5MltpXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZVxyXG59XHJcblxyXG5mdW5jdGlvbiBpc0luQXJyYXkoYXJyYXk6IEFycmF5PGFueT4sIHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IGFycmF5W2ldKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbn1cclxuIl19