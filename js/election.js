function abc(sdName, pageNo){
    $.ajax({
        type:'GET',
        url:`https://euiran.herokuapp.com/http://apis.data.go.kr/9760000/PolplcInfoInqireService2/getPrePolplcOtlnmapTrnsportInfoInqire?serviceKey=vyiziQ9gC5h5qUZI1Fbf6oRT5XU0blUCJUHJmbyeqGCnkK3gg010CYY2okg28Vhpfe7ThjtvJNCECLUhUEESiw%3D%3D&pageNo=${pageNo}&numOfRows=10&sgId=20220309&sdName=${sdName}`,
        dataType:'xml',
        beforeSend:function(){
            $('#elecContent').append('<div class="loading"><i class="fa-solid fa-spinner fa-spin"></i>로딩중입니다.</div>')
        },
        complete:function(){
            $('#elecContent .loading').remove()
        },
        success:function(getdata){
            console.log(getdata)
            usedata(getdata, pageNo)
        },
        error:function(xhr){
            console.log(xhr.status + '/' + xhr.errorText)
        }
    })
}
var sido = '서울특별시'
var startPage = 1
var totalCount = 0
abc(sido, startPage)

function usedata(data, pno){
    totalCount = $(data).find('totalCount').text();
    // if (Number(totalCount)%10) {
    //     totalCount = Math.ceil(Number(totalCount)/10)
    // } else {
    //     totalCount = Number(totalCount)/10
    // }
    totalCount = Math.ceil(Number(totalCount)/10)
    console.log(totalCount)
    var tenCount = Math.ceil(totalCount/10)

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
    elem += `<div class="page">`

    if (startPage>10) {
        elem += `<span class="prev">이전</span>`
    }

    elem += `<span>`
    for (let i=startPage; i<=totalCount && i<startPage+10; i++) {
        if (pno == i) {
            elem += `<a href="${i}" class="on"> {${i}} </a>`
        } else {
            elem += `<a href="${i}"> {${i}} </a>`
        }
    }
    elem += `</span>`

    if (tenCount>=2 && totalCount>startPage+9) {
        elem += `<span class="next">다음</span>`
    }

    elem += `</div>`
    $('#elecContent').append(elem)
}

$('.tabTit li').on('click', function(){
    sido = $(this).text()
    $('#elecContent .placeList, #content .page').remove()
    startPage = 1
    abc(sido, startPage)
})

$('#content').on('click', '.page a', function(){
    var pno = $(this).attr('href')
    $('#elecContent .placeList, #content .page').remove()
    abc(sido, pno)
    return false
})

// 다음버튼
$('#elecContent').on('click', '.page .next', function(){
    if (startPage<totalCount) {
        startPage += 10
    }
    console.log(startPage)
    $('#elecContent .placeList, #content .page').remove()
    abc(sido, startPage)
})
// 이전버튼
$('#elecContent').on('click', '.page .prev', function(){
    if (startPage>10) {
        startPage -= 10
    }
    console.log(startPage)
    $('#elecContent .placeList, #content .page').remove()
    abc(sido, startPage)
})