const responseService={
    statuscode:{
        ok:200,
        created: 201,
        accepted: 202,
        noContent: 204,
        badRequest: 400,
        unauthorized: 401,
        forbidden: 403,
        notFound: 404,
        internalServerError: 500,
    },
    success(message,data){
        return {
            success:true,
            message,
            data,
            status:this.statuscode.ok
        }
    },

    create(message,data){
      return {
         success:true,
         message,
         data,
         status:this.statuscode.created 
      }
    },

    error(message, error) {
        return {
          success: false,
          message,
          status: this.statuscode.badRequest,
        };
    },

    unauthorizedError(message) {
        return {
          success: false,
          message,
          error: "Unauthorized",
          status: this.statuscode.unauthorized,
        };
    },

    forbiddenError(message) {
        return {
          success: false,
          message,
          error: "Forbidden",
          status: this.statuscode.forbidden,
        };
    },

    notFoundError(message) {
        return {
          success: false,
          message,
          error: "Not Found",
          status: this.statuscode.notFound,
        };
    },

    internalServerError(message) {
        return {
          success: false,
          message:message,
          error: "Internal Server Error",
          status: this.statuscode.internalServerError,
        };
    },
    

}

module.exports=responseService;
