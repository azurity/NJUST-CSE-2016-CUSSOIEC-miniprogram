"use strict";
Page({
    data: {
        bbsList: [{ "topicID": "1234567",
                "user": "张三",
                "time": "2019-02-28 22:09:23",
                "title": "为什么这个题使用字扩展而不是位扩展？",
                "content": "balabalabala，4x8k，balabalabala，4x16k，balabalabala",
                "replyCount": 12,
                "clickingRate": 14
            }, { "topicID": "1234567",
                "user": "张三",
                "time": "2019-02-28 22:09:23",
                "title": "为什么这个题使用字扩展而不是位扩展？",
                "content": "balabalabala，4x8k，balabalabala，4x16k，balabalabala",
                "replyCount": 12,
                "clickingRate": 14
            }],
        modalName: ''
    },
    showModal: function (e) {
        this.setData({
            modalName: 'bottomModal'
        });
    },
    hideModal: function (e) {
        this.setData({
            modalName: null
        });
    },
    onPullDownRefresh: function () {
        wx.stopPullDownRefresh();
    },
    onLoad: function (options) {
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLENBQUM7SUFLRCxJQUFJLEVBQUU7UUFDSixPQUFPLEVBQUMsQ0FBQyxFQUFDLFNBQVMsRUFBQyxTQUFTO2dCQUNqQixNQUFNLEVBQUMsSUFBSTtnQkFDWCxNQUFNLEVBQUMscUJBQXFCO2dCQUM1QixPQUFPLEVBQUMsb0JBQW9CO2dCQUM1QixTQUFTLEVBQUMsbURBQW1EO2dCQUM3RCxZQUFZLEVBQUMsRUFBRTtnQkFDZixjQUFjLEVBQUMsRUFBRTthQUM1QixFQUFDLEVBQUMsU0FBUyxFQUFDLFNBQVM7Z0JBQ1YsTUFBTSxFQUFDLElBQUk7Z0JBQ1gsTUFBTSxFQUFDLHFCQUFxQjtnQkFDNUIsT0FBTyxFQUFDLG9CQUFvQjtnQkFDNUIsU0FBUyxFQUFDLG1EQUFtRDtnQkFDN0QsWUFBWSxFQUFDLEVBQUU7Z0JBQ2YsY0FBYyxFQUFDLEVBQUU7YUFDNUIsQ0FBQztRQUNGLFNBQVMsRUFBQyxFQUFFO0tBRWI7SUFDRCxTQUFTLFlBQUMsQ0FBSztRQUNiLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDVCxTQUFTLEVBQUMsYUFBYTtTQUMxQixDQUFDLENBQUE7SUFDSixDQUFDO0lBQ0QsU0FBUyxZQUFDLENBQUs7UUFDYixJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELGlCQUFpQjtRQUNmLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFNRCxNQUFNLEVBQUUsVUFBVSxPQUFPO0lBRXpCLENBQUM7Q0FHRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJQYWdlKHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmhtemdoueahOWIneWni+aVsOaNrlxyXG4gICAgICovXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGJic0xpc3Q6W3tcInRvcGljSURcIjpcIjEyMzQ1NjdcIixcclxuICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXCJ1c2VyXCI6XCLlvKDkuIlcIixcclxuICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXCJ0aW1lXCI6XCIyMDE5LTAyLTI4IDIyOjA5OjIzXCIsXHJcbiAgICAgIMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoFwidGl0bGVcIjpcIuS4uuS7gOS5iOi/meS4qumimOS9v+eUqOWtl+aJqeWxleiAjOS4jeaYr+S9jeaJqeWxle+8n1wiLFxyXG4gICAgICDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqBcImNvbnRlbnRcIjpcImJhbGFiYWxhYmFsYe+8jDR4OGvvvIxiYWxhYmFsYWJhbGHvvIw0eDE2a++8jGJhbGFiYWxhYmFsYVwiLFxyXG4gICAgICDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqBcInJlcGx5Q291bnRcIjoxMixcclxuICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXCJjbGlja2luZ1JhdGVcIjoxNFxyXG4gICAgICB9LHtcInRvcGljSURcIjpcIjEyMzQ1NjdcIixcclxuICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXCJ1c2VyXCI6XCLlvKDkuIlcIixcclxuICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXCJ0aW1lXCI6XCIyMDE5LTAyLTI4IDIyOjA5OjIzXCIsXHJcbiAgICAgIMKgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoFwidGl0bGVcIjpcIuS4uuS7gOS5iOi/meS4qumimOS9v+eUqOWtl+aJqeWxleiAjOS4jeaYr+S9jeaJqeWxle+8n1wiLFxyXG4gICAgICDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqBcImNvbnRlbnRcIjpcImJhbGFiYWxhYmFsYe+8jDR4OGvvvIxiYWxhYmFsYWJhbGHvvIw0eDE2a++8jGJhbGFiYWxhYmFsYVwiLFxyXG4gICAgICDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgwqBcInJlcGx5Q291bnRcIjoxMixcclxuICAgICAgwqDCoMKgwqDCoMKgwqDCoMKgwqDCoMKgXCJjbGlja2luZ1JhdGVcIjoxNFxyXG4gICAgICB9XSxcclxuICAgICAgbW9kYWxOYW1lOicnXHJcbiAgICAgIFxyXG4gICAgfSxcclxuICAgIHNob3dNb2RhbChlOmFueSkge1xyXG4gICAgICB0aGlzLnNldERhdGEoe1xyXG4gICAgICAgICAgbW9kYWxOYW1lOidib3R0b21Nb2RhbCdcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBoaWRlTW9kYWwoZTphbnkpIHtcclxuICAgICAgdGhpcy5zZXREYXRhKHtcclxuICAgICAgICBtb2RhbE5hbWU6IG51bGxcclxuICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBcclxuICAgIG9uUHVsbERvd25SZWZyZXNoKCkge1xyXG4gICAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcclxuICAgIH0sXHJcbiAgXHJcbiAgXHJcbiAgICAvKipcclxuICAgICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XHJcbiAgICAgKi9cclxuICAgIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgICAgXHJcbiAgICB9LFxyXG4gIFxyXG4gICBcclxuICB9KSJdfQ==