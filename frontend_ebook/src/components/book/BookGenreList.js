
async function SelectGenreList() {
  try{
    const response = await fetch('/selectGenreList',{
      //body : JSON.stringify(writeUserReview),
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

export async function SelectSecondGenreList() {
  try{
    const response = await fetch('/selectSecondGenreList',{
      //body : JSON.stringify(writeUserReview),
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

export default SelectGenreList;
