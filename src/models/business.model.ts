export class Business {
    constructor( 
        public userId: string,
        public directory: string,
        public gravatar: any,
        public officeName: string,
        public otherNames: string,
        public gender: string,
        public maritalStatus: string,
        public mobile: string,
        public email: string,    
        public homeTown: string,      
        public position: string,
        public geolocation: any,
        public websiteUrl?: string,
        public fileUpload?: any,
        public landSize?: any,
        public otherInfo?: any) { }
}