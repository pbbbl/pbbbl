var authorizedRanJquery = false;
var $jqueryIsReady = false;
jqueryAwaitAuth();
function jqueryAwaitAuth(){
    window.addEventListener('authorized', function(event) {
        let authDetail = event.detail.auth;
        authorizedRanJquery = true;
        if(!$jqueryIsReady){
            $onReady(function(_$){
                runAwaitJquery(authDetail)
            });
        } else {
            $(function() {
                runAwaitJquery(authDetail)
            });
        }
        
    });
}



function $callJquery(newJquery){
    if(!$jqueryIsReady){
        $jqueryIsReady = true;
        const e = new CustomEvent('$',{
                bubbles: true,
                cancelable: false,
                details: {
                    $: newJquery
                }
            });
            document.querySelector('body').dispatchEvent(e);
        }

        if(!authorizedRanJquery){
            window.addEventListener('authorized',()=>{
             setTimeout(()=>{
                document.querySelector('body').dispatchEvent(e);
             },150);
            })
        }
    
}

$(function(){
    $onReady(function(_$){
        console.log('$ ready',_$,$);

    });
    if(typeof $ != 'undefined'){
        $callJquery($);    
    }
});