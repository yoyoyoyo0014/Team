
async function SearchWriterList(search,page) {
  try{
    const response = await fetch('/searchWriter/'+page+"/Search="+search,{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}

export async function SearchWriterListCount(search) {
  try{
    const response = await fetch('/searchWriterCount/Search='+search,{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    const res =await response.text();
    return res;
  }catch(e){
    console.error(e);
  }
}
export async function selectWriterType() {
  try{
    const response = await fetch('/selectWriterType',{
      headers: {
        'Content-Type': 'application/json',  // Content-Type 헤더 설정
      },
    });
    const res =await response.json();
    return res;
  }catch(e){
    console.error(e);
  }
}
export default SearchWriterList;

