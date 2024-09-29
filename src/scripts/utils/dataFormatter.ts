export function formatCPF(v:string){
    v=String(v)
    v=v.replace(/\D/g,"")                     //Remove tudo o que não é dígito
    v=v.slice(0,11)                           //Limita o número a 11 dígitos (9 dígitos + 2 dígitos de verificação)
    v=v.replace(/(\d{3})(\d)/,"$1.$2")        //Coloca um ponto entre o terceiro e o quarto dígitos
    v=v.replace(/(\d{3})(\d)/,"$1.$2")        //Coloca um ponto entre o terceiro e o quarto dígitos de novo (para o segundo bloco de números)
    v=v.replace(/(\d{3})(\d{1,2})$/,"$1-$2")  //Coloca um hífen entre o terceiro e o quarto dígitos
    return v
  }
  export function formatCNPJ(v:string){
    v=String(v)
    v=v.replace(/\D/g,"")                            //Remove tudo o que não é dígito
    v=v.slice(0,14)                                  //Limita o número a 14 dígitos
    v=v.replace(/^(\d{2})(\d)/,"$1.$2")              //Coloca ponto entre o segundo e o terceiro dígitos
    v=v.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3")  //Coloca ponto entre o quinto e o sexto dígitos
    v=v.replace(/\.(\d{3})(\d)/,".$1/$2")            //Coloca uma barra entre o oitavo e o nono dígitos
    v=v.replace(/(\d{4})(\d)/,"$1-$2")               //Coloca um hífen depois do bloco de quatro dígitos
    return v
  }
  export function formatPhoneNumber(n: string){
    n = String(n)
    n = n.replace(/\D/g, '');                                       //Remove tudo que não é dígito
    n = n.slice(0, 11);                                             //Limita o número a 11 dígitos (DDD + 9 dígitos)
    n = n.replace(/^([1-9]{2})/, "($1) ");                          //Coloca os dois primeiros digitos entre parentesis e um espaço
    if (n.length < 14) n = n.replace(/^(\(\d{2}\) \d{4})/, "$1-");  //Coloca o hífen entre o quarto e o quinto dígitos caso seja um fixo
    if (n.length == 14) n = n.replace(/^(\(\d{2}\) \d{5})/, "$1-")  //Coloca o hífen entre o quinto e o sexto dígitos caso seja um celular
    return n;
  }
  export function formatMoney(n: string, showCurrency: boolean=true){
    n = String(n)
    n = n.replace(/\D/g, '');                      //Remove tudo que não é dígito
    n = n.replace(/^0*/, "")                       //Remove todos os zeros à esquerda
    n = n.padStart(3, '0')                         //Adiciona zeros só até o numero ter ao menos 3 digitos
    n = n.replace(/\d{2}$/, ",$&")                 //Coloca a vírgula antes dos dois últimos dígitos
    let s = n;
    do {
      s = n
      n = n.replace(/(\d+)(\d{3}[\.,])/, "$1.$2")  //Coloca um ponto antes de cada bloco de 3 dígitos 
    } while (s != n)                               //Repete até que não haja mais blocos de 3 dígitos
    if (showCurrency) n=`R$ ${n}`;
    return n;
  }
  export function formatOrdinal(n: number){
      if ([11, 12, 13].includes(n)) return n+"th"
      else if (n%10 == 1) return n+"st"
      else if (n%10 == 2) return n+"nd"
      else if (n%10 == 3) return n+"rd"
      else return n+"th"
  }
  
  export function extractFloat(n: string): number {
    n = String(n);
    n = n.replace(/\D/g, '');                      //Remove tudo que não é dígito
    n = n.replace(/\d{2}$/, ".$&")                 //Coloca a vírgula antes dos dois últimos dígitos
    return Number(n);
  }
  
  export function formatDateToSlash(date: string): string | undefined{
    date = String(date)
    var parts = date.split("-");
    if (parts.length != 3) {
      return undefined;
    }
    var year = parseInt(parts[0]);
    var month = parseInt(parts[1]) - 1; // months indexes are zero based, e.g. 9 == Octobre
    var day = parseInt(parts[2]);
    let new_date = new Date(year, month, day).toJSON().slice(0,10).split(/-/).reverse().join('/');
    return new_date;
  }