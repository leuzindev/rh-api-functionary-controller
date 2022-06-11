(function readyJS(win,doc){

    if(doc.querySelectorAll('.deletar')){
        for(let i=0; i < doc.querySelectorAll('.deletar').length; i++){
            doc.querySelectorAll('.deletar')[i].addEventListener('click', (event) =>{
                if(confirm('Deseja mesmo apagar este dado?')){
                    return true
                }else{
                    event.preventDefault();
                }
            })
        }
    }

})(window, document);
