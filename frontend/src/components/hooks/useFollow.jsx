import { toast } from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'


const useFollow = () => {
    const queryClient = useQueryClient()
    
    const {mutate:follow, isPending} = useMutation({
        mutationFn: async(userId) => {
        try{
            const res = await fetch(`/api/users/follow/${userId}`, {
                method: "POST",
            })

            const data = await res.json();
            if(!res.ok){
                throw new Error(data.error || "Something went wrong!");
            }
            return data; 

        } catch (error){
                throw new Error(error.message); 
            }
        },
        onSuccess:() => {
            Promise.all([
             //* this will invalidate the suggested users, so when the user follows one of the users it will be removed from the list and update the ui.
            queryClient.invalidateQueries({queryKey: ["suggestedUsers"]}),
            //* this will be for when a user clicks follow on the profile it will change the button to unfollow
            queryClient.invalidateQueries({queryKey: ["authUsers"]}),
            ])
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });
    return { follow, isPending };
}

export default useFollow;