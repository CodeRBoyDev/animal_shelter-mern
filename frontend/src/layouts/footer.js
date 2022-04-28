import SimpleReactFooter from "simple-react-footer";
export default function Footer(){


  const description = "The Pet Society animal shelter is a non profit organization that rescues stray dogs and cats. The shelter records the animal's breed, gender, approximate age and   other relevant information. They are also checked for diseases or injuries by volunteer veterinarians. Once these strays are rehabilitated, They are now ready for adoption by qualified individuals.";
  const title = <h1><a href="#"><i style={{color: 'ffff' }} className="nav-icon fas fa-paw">PET SOCIETY</i></a></h1>
  const columns = [
   
 ];
 return <SimpleReactFooter 
    description={description} 
    title={title}
    columns={columns}
    linkedin="fluffy_cat_on_linkedin"
    facebook="fluffy_cat_on_fb"
    twitter="fluffy_cat_on_twitter"
    instagram="fluffy_cat_live"
    youtube="UCFt6TSF464J8K82xeA?"
    pinterest="fluffy_cats_collections"
    copyright="Ricky Boy H. Donadillo"
    iconColor="ffff"
    backgroundColor="#987554"
    fontColor="white"
    copyrightColor="white"
 />;
}