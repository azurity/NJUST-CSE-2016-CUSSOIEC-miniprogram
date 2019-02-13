"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = getApp();
Page({
    data: {
        iconList: [{
                icon: 'emojifill',
                color: 'red',
                badge: 120,
                name: '考勤'
            }, {
                icon: 'writefill',
                color: 'mauve',
                badge: 1,
                name: '试题作业'
            }, {
                icon: 'selectionfill',
                color: 'cyan',
                badge: 0,
                name: '评教'
            }, {
                icon: 'circlefill',
                color: 'olive',
                badge: 22,
                name: '配套资源'
            }],
        class: {},
        isLiving: true,
        videoList: []
    },
    tapCourse: function () {
    },
    onLoad: function () {
        var obj = {
            courseID: 'qw123',
            active: [2, 3, 4],
            position: [
                {
                    dayOfWeek: 0,
                    indexOfDay: [0, 1, 2]
                }
            ],
            info: {
                name: '高等数学',
                teacher: '祖冲之',
                location: 'III-105'
            }
        };
        var videos = [{
                date: '2019-1-12',
                courses: [{
                        id: 'v001',
                        name: '1.函数及其特性',
                        iswatch: false,
                        url: ''
                    }]
            },
            { date: '2019-1-13',
                courses: [{
                        id: 'v002',
                        name: '2.极限的概念、性质和运算法则',
                        iswatch: true,
                        url: ''
                    }]
            },
            { date: '2019-1-14',
                courses: [{
                        id: 'v003',
                        name: '3.两个重要极限',
                        iswatch: true,
                        url: ''
                    }, {
                        id: 'v004',
                        name: '4.极限存在准则',
                        iswatch: false,
                        url: ''
                    }]
            },
            { date: '2019-1-15',
                courses: [{
                        id: 'v005',
                        name: '5.无穷小量和无穷大量',
                        iswatch: false,
                        url: ''
                    }]
            }
        ];
        this.setData({
            class: obj,
            videoList: videos
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291cnNlRGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY291cnNlRGV0YWlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFVLENBQUE7QUFDNUIsSUFBSSxDQUFDO0lBQ0QsSUFBSSxFQUFDO1FBQ0QsUUFBUSxFQUFFLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ1gsRUFBRTtnQkFDRCxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07YUFDYixFQUFFO2dCQUNELElBQUksRUFBRSxlQUFlO2dCQUNyQixLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLEVBQUUsSUFBSTthQUNYLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLEtBQUssRUFBRSxPQUFPO2dCQUNkLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQztRQUNOLEtBQUssRUFBQyxFQUFFO1FBQ1IsUUFBUSxFQUFDLElBQUk7UUFDYixTQUFTLEVBQUMsRUFBRTtLQUdiO0lBQ0QsU0FBUztJQUdULENBQUM7SUFDRCxNQUFNO1FBQ0osSUFBSSxHQUFHLEdBQUM7WUFDTixRQUFRLEVBQUMsT0FBTztZQUNoQixNQUFNLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUNkLFFBQVEsRUFBRTtnQkFDUjtvQkFDSSxTQUFTLEVBQUUsQ0FBQztvQkFDWixVQUFVLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztpQkFDeEI7YUFDRDtZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsTUFBTTtnQkFDWixPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsU0FBUzthQUNyQjtTQUNILENBQUE7UUFDRCxJQUFJLE1BQU0sR0FBQyxDQUFDO2dCQUNYLElBQUksRUFBQyxXQUFXO2dCQUNoQixPQUFPLEVBQUMsQ0FBQzt3QkFDTCxFQUFFLEVBQUUsTUFBTTt3QkFDVixJQUFJLEVBQUUsVUFBVTt3QkFDaEIsT0FBTyxFQUFDLEtBQUs7d0JBQ2IsR0FBRyxFQUFFLEVBQUU7cUJBQUMsQ0FBQzthQUFDO1lBQ2QsRUFBQyxJQUFJLEVBQUMsV0FBVztnQkFDakIsT0FBTyxFQUFDLENBQUM7d0JBQ0wsRUFBRSxFQUFFLE1BQU07d0JBQ1YsSUFBSSxFQUFFLGlCQUFpQjt3QkFDdkIsT0FBTyxFQUFDLElBQUk7d0JBQ1osR0FBRyxFQUFFLEVBQUU7cUJBQ1YsQ0FBQzthQUNBO1lBQ0QsRUFBQyxJQUFJLEVBQUMsV0FBVztnQkFDakIsT0FBTyxFQUFDLENBQUM7d0JBQ04sRUFBRSxFQUFFLE1BQU07d0JBQ1YsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBQyxJQUFJO3dCQUNaLEdBQUcsRUFBRSxFQUFFO3FCQUNULEVBQUM7d0JBQ0MsRUFBRSxFQUFFLE1BQU07d0JBQ1YsSUFBSSxFQUFFLFVBQVU7d0JBQ2hCLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEdBQUcsRUFBRSxFQUFFO3FCQUNULENBQUM7YUFFRDtZQUNELEVBQUMsSUFBSSxFQUFDLFdBQVc7Z0JBQ2pCLE9BQU8sRUFBQyxDQUFDO3dCQUNOLEVBQUUsRUFBRSxNQUFNO3dCQUNWLElBQUksRUFBRSxhQUFhO3dCQUNuQixPQUFPLEVBQUUsS0FBSzt3QkFDZCxHQUFHLEVBQUUsRUFBRTtxQkFDVCxDQUFDO2FBRUQ7U0FFTCxDQUFBO1FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEtBQUssRUFBQyxHQUFHO1lBQ1QsU0FBUyxFQUFDLE1BQU07U0FDakIsQ0FBQyxDQUFBO0lBRUYsQ0FBQztDQUlKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElNeUFwcCB9IGZyb20gJy4uLy4uL2FwcCdcclxuY29uc3QgYXBwID0gZ2V0QXBwPElNeUFwcD4oKVxyXG5QYWdlKHtcclxuICAgIGRhdGE6e1xyXG4gICAgICAgIGljb25MaXN0OiBbe1xyXG4gICAgICAgICAgICBpY29uOiAnZW1vamlmaWxsJyxcclxuICAgICAgICAgICAgY29sb3I6ICdyZWQnLFxyXG4gICAgICAgICAgICBiYWRnZTogMTIwLFxyXG4gICAgICAgICAgICBuYW1lOiAn6ICD5YukJ1xyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBpY29uOiAnd3JpdGVmaWxsJyxcclxuICAgICAgICAgICAgY29sb3I6ICdtYXV2ZScsXHJcbiAgICAgICAgICAgIGJhZGdlOiAxLFxyXG4gICAgICAgICAgICBuYW1lOiAn6K+V6aKY5L2c5LiaJ1xyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBpY29uOiAnc2VsZWN0aW9uZmlsbCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnY3lhbicsXHJcbiAgICAgICAgICAgIGJhZGdlOiAwLFxyXG4gICAgICAgICAgICBuYW1lOiAn6K+E5pWZJ1xyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBpY29uOiAnY2lyY2xlZmlsbCcsXHJcbiAgICAgICAgICAgIGNvbG9yOiAnb2xpdmUnLFxyXG4gICAgICAgICAgICBiYWRnZTogMjIsXHJcbiAgICAgICAgICAgIG5hbWU6ICfphY3lpZfotYTmupAnXHJcbiAgICAgICAgICB9XSxcclxuICAgICAgY2xhc3M6e30sXHJcbiAgICAgIGlzTGl2aW5nOnRydWUsLy/mmK/lkKbmraPlnKjnm7Tmkq1cclxuICAgICAgdmlkZW9MaXN0OltdXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICB0YXBDb3Vyc2UoKXtcclxuXHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIG9uTG9hZCgpe1xyXG4gICAgICBsZXQgb2JqPXtcclxuICAgICAgICBjb3Vyc2VJRDoncXcxMjMnLFxyXG4gICAgICAgIGFjdGl2ZTpbMiwzLDRdLFxyXG4gICAgICAgIHBvc2l0aW9uOiBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgZGF5T2ZXZWVrOiAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICBpbmRleE9mRGF5OiBbMCwgMSwgMl1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgXSxcclxuICAgICAgICAgaW5mbzoge1xyXG4gICAgICAgICAgIG5hbWU6ICfpq5jnrYnmlbDlraYnLFxyXG4gICAgICAgICAgIHRlYWNoZXI6ICfnpZblhrLkuYsnLFxyXG4gICAgICAgICAgIGxvY2F0aW9uOiAnSUlJLTEwNScgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICB9XHJcbiAgICAgbGV0IHZpZGVvcz1be1xyXG4gICAgICBkYXRlOicyMDE5LTEtMTInLFxyXG4gICAgICBjb3Vyc2VzOlt7XHJcbiAgICAgICAgICBpZDogJ3YwMDEnLFxyXG4gICAgICAgICAgbmFtZTogJzEu5Ye95pWw5Y+K5YW254m55oCnJyxcclxuICAgICAgICAgIGlzd2F0Y2g6ZmFsc2UsXHJcbiAgICAgICAgICB1cmw6ICcnfV19LFxyXG4gICAgICB7ZGF0ZTonMjAxOS0xLTEzJyxcclxuICAgICAgY291cnNlczpbe1xyXG4gICAgICAgICAgaWQ6ICd2MDAyJyxcclxuICAgICAgICAgIG5hbWU6ICcyLuaegemZkOeahOamguW/teOAgeaAp+i0qOWSjOi/kOeul+azleWImScsXHJcbiAgICAgICAgICBpc3dhdGNoOnRydWUsXHJcbiAgICAgICAgICB1cmw6ICcnXHJcbiAgICAgIH1dICAgICAgICAgXHJcbiAgICAgICB9LFxyXG4gICAgICAge2RhdGU6JzIwMTktMS0xNCcsXHJcbiAgICAgICBjb3Vyc2VzOlt7XHJcbiAgICAgICAgICBpZDogJ3YwMDMnLFxyXG4gICAgICAgICAgbmFtZTogJzMu5Lik5Liq6YeN6KaB5p6B6ZmQJyxcclxuICAgICAgICAgIGlzd2F0Y2g6dHJ1ZSxcclxuICAgICAgICAgIHVybDogJydcclxuICAgICAgIH0se1xyXG4gICAgICAgICAgaWQ6ICd2MDA0JyxcclxuICAgICAgICAgIG5hbWU6ICc0LuaegemZkOWtmOWcqOWHhuWImScsXHJcbiAgICAgICAgICBpc3dhdGNoOiBmYWxzZSxcclxuICAgICAgICAgIHVybDogJydcclxuICAgICAgIH1dXHJcblxyXG4gICAgICAgfSxcclxuICAgICAgIHtkYXRlOicyMDE5LTEtMTUnLFxyXG4gICAgICAgY291cnNlczpbe1xyXG4gICAgICAgICAgaWQ6ICd2MDA1JyxcclxuICAgICAgICAgIG5hbWU6ICc1LuaXoOept+Wwj+mHj+WSjOaXoOept+Wkp+mHjycsXHJcbiAgICAgICAgICBpc3dhdGNoOiBmYWxzZSxcclxuICAgICAgICAgIHVybDogJydcclxuICAgICAgIH1dXHJcblxyXG4gICAgICAgfVxyXG4gIFxyXG4gIF1cclxuICAgIHRoaXMuc2V0RGF0YSh7XHJcbiAgICAgIGNsYXNzOm9iaixcclxuICAgICAgdmlkZW9MaXN0OnZpZGVvc1xyXG4gICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0pO1xyXG4iXX0=