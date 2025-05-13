import{db} from "./../config/firebase";
export const dbService ={
    async createEvent(user, title, description, educationLevel, category){
        try{
            db.collection('eventos').add({
                user: user,
                title: title,
                description: description,
                educationLevel: educationLevel,
                category: category

            });
        }catch(error){
            throw error;
        }

    }
}