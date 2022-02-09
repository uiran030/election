function abc(sdName){
    $.ajax({
        type:'GET',
        url:`https://euiran.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=vyiziQ9gC5h5qUZI1Fbf6oRT5XU0blUCJUHJmbyeqGCnkK3gg010CYY2okg28Vhpfe7ThjtvJNCECLUhUEESiw%3D%3D&pageNo=1&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType:'xml',
        beforesend:function(){
            $('#content').append('<div class="loading"><i class="fa-solid fa-spinner"></i>로딩중입니다.</div>')
        },
        complete:function(){
            $('#content .loading').remove()
        },
        success:function(getdata){
            console.log(getdata)
            usedata(getdata)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText) 
        }
    })
}
abc('서울특별시')

function usedata(data){
    $('#content .placeList').remove()
    var elem = `<ul class="placeList">`
    $(data).find('item').each(function(){
        var placeName = $(this).find('placeName').text()
        var addr = $(this).find('addr').text()
        elem += `<li>`
        elem += `<p>${placeName}</p>`
        elem += `<p>${addr}</p>`
        elem += `</li>`
    })
    elem += `</ul>`
    $('#content').append(elem)
}

$('.tabTit li').on('click', function(){
    var abc = $(this).text()
    abc(sido)
})