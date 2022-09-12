// Save client side database object
let localDataBaseName = "LitFireDB";

// Data Object Names
let todoObjectName = "to_dos"
let userinfoObjectName = "user_info"
let sentTodoObjectName = "sent_to_dos"
let localStoreTodoObjectName = "Local_Store_TODOS";
let userRelationObjectName = "user_relations"
let flagObjectName = "flags"
let friendObjectName = "friends"
let dbVersion = 8;
let LitFireDB;

$(window).on('load', function() {
    let userInfo;
    $.ajax({
        dataType: "json",
        url: "/userservice/getinfo/",
        async:false,
        crossDomain:true,
        xhrFields: {
            withCredentials: true,
        },
        success: function (item){
            userInfo = item;
        }
    });

    let TODOs;
    $.ajax({
        dataType: "json",
        url: "/userservice/getodos/",
        async:false,
        crossDomain:true,
        xhrFields: {
            withCredentials: true,
        },
        success: function (item){
            TODOs = item.todos;
        }
    });

    let invitations;
    $.ajax({
        dataType: "json",
        url: "/userservice/geInvitation/",
        async:false,
        crossDomain:true,
        xhrFields: {
            withCredentials: true,
        },
        success: function (item){
            invitations = item.body;
        }
    });

    let relations;
    $.ajax({
        dataType: "json",
        url: "/userservice/getRelations/",
        async:false,
        crossDomain:true,
        xhrFields: {
            withCredentials: true,
        },
        success: function (item){
            relations = item.body;
        }
    });
    /* Client Side DataBase *******************************************************************************************/

    // Open client side database
    let request = window.indexedDB.open(localDataBaseName, dbVersion,{
        upgrade(db, oldVersion, newVersion, transaction) {
            // Check local indexDB version
            // If data object already exists,
            // To dos
            if(!localDataBaseName.objectStoreNames.contains(todoObjectName)){
                let ToDoObject = LitFireDB.createObjectStore(todoObjectName, { keyPath: "id" });
                ToDoObject.createIndex("senderId","senderId",{unique:false});
                ToDoObject.createIndex("senderName","senderName",{unique:false});
                ToDoObject.createIndex("receiverId","receiverId",{unique:false});
                ToDoObject.createIndex("type","type",{unique:false});
                ToDoObject.createIndex("icon","icon",{unique:false});
                ToDoObject.createIndex("caption","caption",{unique:false});
                ToDoObject.createIndex("content","content",{unique:false});
                ToDoObject.createIndex("URL","URL",{unique:false});
                ToDoObject.createIndex("setTime","setTime",{unique:false});
                ToDoObject.createIndex("expireTime","setTime",{unique:false});
                ToDoObject.createIndex("sendTime","setTime",{unique:false});
                ToDoObject.createIndex("status","status",{unique:false});
                ToDoObject.createIndex("flag","flag",{unique:false});
            }

            if(!localDataBaseName.objectStoreNames.contains(friendObjectName)){
                let friendObject = LitFireDB.createObjectStore(friendObjectName, { keyPath: "id" });
                friendObject.createIndex("senderId","senderId",{unique:false});
                friendObject.createIndex("senderName","senderName",{unique:false});
                friendObject.createIndex("icon","icon",{unique:false});
                friendObject.createIndex("receiverId","receiverId",{unique:false});
                friendObject.createIndex("status","status",{unique:false});
                friendObject.createIndex("type","type",{unique:false});
            }

            // User info
            if(!localDataBaseName.objectStoreNames.contains(userinfoObjectName)){
                let userinfoObject = LitFireDB.createObjectStore(userinfoObjectName, { keyPath: "id" });
                userinfoObject.createIndex("username","username",{unique:false});
                userinfoObject.createIndex("profileavatar","profileavatar",{unique:false});
                userinfoObject.createIndex("email","email",{unique:false});
            }

            // Sent TO_DO object
            if(!localDataBaseName.objectStoreNames.contains(sentTodoObjectName)){
                let sentTodoObject = LitFireDB.createObjectStore(sentTodoObjectName, { keyPath: "id" });
                sentTodoObject.createIndex("senderId","senderId",{unique:false});
                sentTodoObject.createIndex("senderName","senderName",{unique:false});
                sentTodoObject.createIndex("receiverId","receiverId",{unique:false});
                sentTodoObject.createIndex("type","type",{unique:false});
                sentTodoObject.createIndex("icon","icon",{unique:false});
                sentTodoObject.createIndex("caption","caption",{unique:false});
                sentTodoObject.createIndex("content","content",{unique:false});
                sentTodoObject.createIndex("URL","URL",{unique:false});
                sentTodoObject.createIndex("setTime","setTime",{unique:false});
                sentTodoObject.createIndex("expireTime","setTime",{unique:false});
                sentTodoObject.createIndex("sendTime","setTime",{unique:false});
                sentTodoObject.createIndex("status","status",{unique:false});
                sentTodoObject.createIndex("flag","flag",{unique:false});
            }

            // Local Stored to_do object
            if(!localDataBaseName.objectStoreNames.contains(localStoreTodoObjectName)){
                let localStoreTodoObject = LitFireDB.createObjectStore(localStoreTodoObjectName, { keyPath: "id" });
                localStoreTodoObject.createIndex("senderId","senderId",{unique:false});
                localStoreTodoObject.createIndex("senderName","senderName",{unique:false});
                localStoreTodoObject.createIndex("receiverId","receiverId",{unique:false});
                localStoreTodoObject.createIndex("type","type",{unique:false});
                localStoreTodoObject.createIndex("icon","icon",{unique:false});
                localStoreTodoObject.createIndex("caption","caption",{unique:false});
                localStoreTodoObject.createIndex("content","content",{unique:false});
                localStoreTodoObject.createIndex("URL","URL",{unique:false});
                localStoreTodoObject.createIndex("setTime","setTime",{unique:false});
                localStoreTodoObject.createIndex("expireTime","setTime",{unique:false});
                localStoreTodoObject.createIndex("sendTime","setTime",{unique:false});
                localStoreTodoObject.createIndex("status","status",{unique:false});
                localStoreTodoObject.createIndex("flag","flag",{unique:false});
            }

            // User relation object
            if(!localDataBaseName.objectStoreNames.contains(userRelationObjectName)){
                let userRelationObject = LitFireDB.createObjectStore(userRelationObjectName, { keyPath: "id" });
                userRelationObject.createIndex("icon","icon",{unique:false});
                userRelationObject.createIndex("caption","caption",{unique:false});
            }

            // Flag object
            if(!localDataBaseName.objectStoreNames.contains(flagObjectName)){
                let flagObject = LitFireDB.createObjectStore(flagObjectName, { keyPath: "id" });
                flagObject.createIndex("icon","icon",{unique:false});
                flagObject.createIndex("description","description",{unique:false});
            }
        }
    });
    request.onerror = event => {
        console.log("Open Client Side DB Failed");
    };
    request.onupgradeneeded = event => {
        LitFireDB = event.target.result;

        if(!LitFireDB.objectStoreNames.contains(todoObjectName)){
            let ToDoObject = LitFireDB.createObjectStore(todoObjectName, { keyPath: "id" });
            ToDoObject.createIndex("senderId","senderId",{unique:false});
            ToDoObject.createIndex("receiverId","receiverId",{unique:false});
            ToDoObject.createIndex("type","type",{unique:false});
            ToDoObject.createIndex("icon","icon",{unique:false});
            ToDoObject.createIndex("caption","caption",{unique:false});
            ToDoObject.createIndex("content","content",{unique:false});
            ToDoObject.createIndex("URL","URL",{unique:false});
            ToDoObject.createIndex("setTime","setTime",{unique:false});
            ToDoObject.createIndex("expireTime","setTime",{unique:false});
            ToDoObject.createIndex("sendTime","setTime",{unique:false});
            ToDoObject.createIndex("status","status",{unique:false});
            ToDoObject.createIndex("flag","flag",{unique:false});
        }

        // User info
        if(!LitFireDB.objectStoreNames.contains(userinfoObjectName)){
            let userinfoObject = LitFireDB.createObjectStore(userinfoObjectName, { keyPath: "id" });
            userinfoObject.createIndex("username","username",{unique:false});
            userinfoObject.createIndex("profileavatar","profileavatar",{unique:false});
            userinfoObject.createIndex("email","email",{unique:false});
        }

        // Sent TO_DO object
        if(!LitFireDB.objectStoreNames.contains(sentTodoObjectName)){
            let sentTodoObject = LitFireDB.createObjectStore(sentTodoObjectName, { keyPath: "id" });
            sentTodoObject.createIndex("senderId","senderId",{unique:false});
            sentTodoObject.createIndex("receiverId","receiverId",{unique:false});
            sentTodoObject.createIndex("type","type",{unique:false});
            sentTodoObject.createIndex("icon","icon",{unique:false});
            sentTodoObject.createIndex("caption","caption",{unique:false});
            sentTodoObject.createIndex("content","content",{unique:false});
            sentTodoObject.createIndex("URL","URL",{unique:false});
            sentTodoObject.createIndex("setTime","setTime",{unique:false});
            sentTodoObject.createIndex("expireTime","setTime",{unique:false});
            sentTodoObject.createIndex("sendTime","setTime",{unique:false});
            sentTodoObject.createIndex("status","status",{unique:false});
            sentTodoObject.createIndex("flag","flag",{unique:false});
        }

        if(!LitFireDB.objectStoreNames.contains(friendObjectName)){
            let friendObject = LitFireDB.createObjectStore(friendObjectName, { keyPath: "id" });
            friendObject.createIndex("senderId","senderId",{unique:false});
            friendObject.createIndex("senderName","senderName",{unique:false});
            friendObject.createIndex("icon","icon",{unique:false});
            friendObject.createIndex("receiverId","receiverId",{unique:false});
            friendObject.createIndex("status","status",{unique:false});
            friendObject.createIndex("type","type",{unique:false});
        }

        // Local Stored to_do object
        if(!LitFireDB.objectStoreNames.contains(localStoreTodoObjectName)){
            let localStoreTodoObject = LitFireDB.createObjectStore(localStoreTodoObjectName, { keyPath: "id" });
            localStoreTodoObject.createIndex("senderId","senderId",{unique:false});
            localStoreTodoObject.createIndex("senderName","senderName",{unique:false});
            localStoreTodoObject.createIndex("receiverId","receiverId",{unique:false});
            localStoreTodoObject.createIndex("type","type",{unique:false});
            localStoreTodoObject.createIndex("icon","icon",{unique:false});
            localStoreTodoObject.createIndex("caption","caption",{unique:false});
            localStoreTodoObject.createIndex("content","content",{unique:false});
            localStoreTodoObject.createIndex("URL","URL",{unique:false});
            localStoreTodoObject.createIndex("setTime","setTime",{unique:false});
            localStoreTodoObject.createIndex("expireTime","setTime",{unique:false});
            localStoreTodoObject.createIndex("sendTime","setTime",{unique:false});
            localStoreTodoObject.createIndex("status","status",{unique:false});
            localStoreTodoObject.createIndex("flag","flag",{unique:false});
        }

        // User relation object
        if(!LitFireDB.objectStoreNames.contains(userRelationObjectName)){
            let userRelationObject = LitFireDB.createObjectStore(userRelationObjectName, { keyPath: "id" });
            userRelationObject.createIndex("icon","icon",{unique:false});
            userRelationObject.createIndex("caption","caption",{unique:false});
        }

        // Flag object
        if(!LitFireDB.objectStoreNames.contains(flagObjectName)){
            let flagObject = LitFireDB.createObjectStore(flagObjectName, { keyPath: "id" });
            flagObject.createIndex("icon","icon",{unique:false});
            flagObject.createIndex("description","description",{unique:false});
        }
    };
    // Open DB success update data and inject data to view
    request.onsuccess = event =>{
        LitFireDB = event.target.result;
        let userinfoObjectStore = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName);
        let todoObjectStore = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName);
        let friendObject = LitFireDB.transaction([friendObjectName],"readwrite").objectStore(friendObjectName);
        let sentTodoObjectStore = LitFireDB.transaction([sentTodoObjectName],"readwrite").objectStore(sentTodoObjectName);
        let userRelationObjectStore = LitFireDB.transaction([userRelationObjectName],"readwrite").objectStore(userRelationObjectName);
        let flagObjectStore = LitFireDB.transaction([flagObjectName],"readwrite").objectStore(flagObjectName);

        // Store values in the newly created objectStore.
        let userInfoRequest = userinfoObjectStore.add(userInfo);
        userInfoRequest.onerror = event =>{
        }

        // Store values in the newly created objectStore.
        for (let i=0; i<TODOs.length;i++){
            let TODOsrequest = todoObjectStore.add(TODOs[i]);
            TODOsrequest.onerror = event =>{
            }
        }

        // Store values in the newly created objectStore.
        for (let i=0; i<invitations.length;i++){
            let invitationRequest = friendObject.add(invitations[i]);
            invitationRequest.onerror = event =>{
            }
        }

        for (let i=0; i<relations.length;i++){
            let relationRequest = userRelationObjectStore.add(relations[i]);
            relationRequest.onsuccess = event =>{
            }
            relationRequest.onerror = event =>{
            }
        }

        let getRequest = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName).getAll();
        getRequest.onsuccess = event =>{
            let toDoList = event.target.result;
            let list = "";
            for(let i=0; i<toDoList.length; i++){
                if(toDoList[i].status!=1)continue;
                let datetime = new Date(toDoList[i].setTime);
                let month = parseInt(datetime.getMonth())+1;
                list +=
                    "<div class='reminderItem' id='"+toDoList[i].id+"'>"+
                    "<div class='reminderBaseContainer'>"+
                    "<div class='reminderFunctionBarDelete'>" +
                    "<div class='functionBarButtonCaption'>" +
                    "Delete"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='reminderContentContainer'>"+
                    "<div class='reminderIconContainer'>"+
                    "<div class='reminderIcon'>" +
                    "<img src="+ toDoList[i].icon +">"+
                    "</div>"+
                    "</div>"+
                    "<div class='reminderContent'>"+
                    "<div class='reminderContentCaption'>"+
                    "<div class='reminderCaptionText' id='"+"Caption"+i+"'>"+toDoList[i].caption+"</div>"+
                    "</div>"+
                    "<div class='reminderContentTime'>"+
                    datetime.getDate()+"/"+ month+"/"+ datetime.getFullYear()+" "+ datetime.getHours()+":"+ datetime.getMinutes()+
                    "</div>"+
                    "</div>"+
                    "<div class='reminderFlagContainer'>"+"</div>"+
                    "</div>"+
                    "</div>"
                ;
            }
            $("#reminderList").append(list);
        }

        let getRelationRequest = LitFireDB.transaction([userRelationObjectName],"readwrite").objectStore(userRelationObjectName).getAll();
        getRelationRequest.onsuccess = event =>{
        }

        // READ user INFO and render display
        let userinfoJSON;
        let getUserinfoRequest = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName).getAll();
        getUserinfoRequest.onsuccess = event =>{
            userinfoJSON = event.target.result;
            $("#userInfoHeaderAvatar").attr("src",userinfoJSON[0].profileavatar);
        }

        loadInvitation();


    }

    /* Client Side DataBase *******************************************************************************************/
// Reload invitations
    function loadInvitation(){
        // READ from client side db and inject data to view
        let getAllRequest = LitFireDB.transaction([friendObjectName],"readwrite").objectStore(friendObjectName).getAll();
        let invitationList;
        getAllRequest.onerror = event =>{
            console.log("error");
        }
        getAllRequest.onsuccess = event =>{
            invitationList = event.target.result;
            /* Render user info page */
            //$("#userInfoHeaderAvatar").attr("src",userinfoJSON[0].profileavatar);

            /* Render main function to-do list item */
            let list = "";
            for(let i=0; i<invitationList.length; i++){
                if(invitationList[i].status!=0)continue;
                list +=
                    "<div class='reminderItem' id='"+invitationList[i].id+"'>"+
                    "<div class='invitationContentContainer'>"+

                    "<div class='reminderIconContainer'>"+
                    "<div class='reminderIcon'>" +
                    "<img src="+ invitationList[i].icon +">"+
                    "</div>"+
                    "</div>"+

                    "<div class='reminderContent'>"+
                    "<div class='invitationContentCaption'>"+
                    "<div class='invitationCaptionText' id='"+"Caption"+i+"'>"+invitationList[i].senderName+"</div>"+
                    "</div>"+
                    "</div>"+

                    "<div class='invitationConsentContainer'>"+
                    "<div class='buttonContainer'>"+
                    "<div class='addButton' id='consent-friend-button'>"+
                    "<div>"+"Yes"+"</div>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "<div class='invitationDeclineContainer'>"+
                    "<div class='buttonContainer'>"+
                    "<div class='addButton' id='decline-friend-button'>"+
                    "<div>"+"No"+"</div>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "</div>"+
                    "</div>"
                ;
            }
            $("#invitationList").html(list);
        }
    }
    console.log('loading');
})

/* Document ready render display    */
$(window).on('load', function(){

    console.log("Loaded")
    const html = document.querySelector('html');
    // Define size attribute for
    let mainContainerHeight;
    let mainContainerWidth;

    // Define Flag for Function Bar show status
    let mainReminderDetailContainerFlag = false;

    // reminderContentCaption Margin left offset to align width
    let reminderContentCaptionMarginOffset=8;
    // Render display based on screen width
    // Default: 1
    // Mobile:  2
    // Pad:     3
    // PC:      4
    let renderFlag = 2;
    if(0 < screen.availWidth <= 600){
        renderFlag = 2;
    }else if(600 < screen.availWidth <= 1080){
        renderFlag = 2;
    }else if(1080 < screen.availWidth){
        renderFlag = 2;
    }
    if(screen.height<1500){
        $('html').css("fontSize", 9);
    }


    /* Render Display and Data when document is ready *****************************************************************/

    // Render display
    switch (renderFlag) {
        case 1:
            mainContainerHeight = $(document).height()-$(".mainHeader").height()-$(".mainFunctionBar").height();
            mainContainerWidth = $(document).width();
            $(".mainContainer").attr("width",mainContainerWidth);
            $(".mainContainer").attr("height",mainContainerHeight);
            break;
        case 2:
            let viewPortHeight=document.documentElement.clientHeight;
            $(".wholeContainer").height(viewPortHeight);
            $(".mainContainer").height(viewPortHeight-$(".mainHeader").height()-$(".mainFunctionBar").height());
            $(".reminderListContainer").height($(".mainContainer").height());
            $(".reminderContentCaption").width($(document).width()-$(".reminderIconContainer").width()-$(".reminderFlagContainer").width()-reminderContentCaptionMarginOffset)
            $(".reminderContentTime").width($(document).width()-$(".reminderIconContainer").width()-$(".reminderFlagContainer").width()-reminderContentCaptionMarginOffset)
            $(".mainReminderWholeContainer").hide();
            $(".addReminderWholeContainer").hide();
            $(".mainUserInfoWholeContainer").hide();
            $(".detailToggleContainer").hide();
            $(".friendInfoWholeContainer").hide();
            $(".userInfoWholeContainer").hide();
            $(".addReminderDetailContainer .DetailTime .dateInput").width($(document).width()*0.8);
            $(".addReminderDetailContainer").height($(".addReminderWholeContainer").height()-$(".addReminderHeader").height()-$(".addReminderDetailFooterContainer").height());
            $(".mainReminderMask").height(viewPortHeight-$(".mainReminderDetailContainer").height());
            $(".userInfoMask").height(viewPortHeight-$(".DetailContainer").height());
            $(".friendInfoMask").height(viewPortHeight-$(".friendInfoWholeContainer .DetailContainer").height());
            notifyMe();
            break;
        case 3:
            mainContainerHeight = $(document).height()-$(".mainHeader").height()-$(".mainFunctionBar").height();
            mainContainerWidth = $(document).width();
            $(".mainContainer").height(mainContainerHeight);
            $(".reminderContent").width($(document).width()-$(".reminderIconContainer").width()-$(".reminderFlagContainer").width())
            break;
        case 4:
            mainContainerHeight = $(document).height()-$(".mainHeader").height()-$(".mainFunctionBar").height();
            mainContainerWidth = $(document).width();
            $(".mainContainer").height(mainContainerHeight);
            break;
        default:
    }


    /* Slide Reminder item to delete*/
    (function slideReminder(){
        /* x coordinate for touch start and end*/
        let start_x;
        let end_x;
        let start_y;
        let end_y;

        let delete_button_width = 200;
        /* IF the slide movement is success,*/
        /* Default false*/
        let touch_flag = false;

        // Touch starts
        $(document).on('touchstart', '.reminderContentContainer', function(e){
            if(e.originalEvent.targetTouches){
                start_x = e.originalEvent.targetTouches[0].pageX;
                start_y = e.originalEvent.targetTouches[0].pageY;
            }else {
                start_x = e.pageX;
                start_y = e.pageY;
            }
        });

        // Touch on going
        $(document).on('touchmove', '.reminderContentContainer', function(e){

            let offset;
            // Get touch end coordinate
            if(e.originalEvent.targetTouches){
                end_x = e.originalEvent.targetTouches[0].pageX;
                offset = start_x - end_x;
            }else {
                end_x = e.pageX;
                offset = start_x - end_x;
            }
            // Start moving and not move less than the button width
            if(20< Math.abs(offset)){
                // Render animation
                offset=-offset;
                $(this).css("left",offset+"px");
                touch_flag = true;
            }else {
                return;
            }

        });

        // Touch ended
        $(document).on('touchend', '.reminderContentContainer', function(e){
            let offset = start_x - end_x;
            // If touch success
            if (touch_flag == true){
                if(offset>0){
                    $(this).animate({left: -delete_button_width+"px"},300);
                }
                else {
                    $(this).animate({left: 0+"px"},300);
                }
            }else return;
            touch_flag = false;
        });
    })();


    let clicked = 0;
    $(document).on('click', '.reminderFlagContainer', function(e){
        let delete_button_width = 200;
        if(clicked == 0){
            $(this).closest('.reminderContentContainer').animate({left: -delete_button_width+"px"},300);
            clicked = 1;
            console.log(clicked);
        }else{
            $(this).closest('.reminderContentContainer').animate({left: 0+"px"},300);
            clicked = 0;
            console.log(clicked);
        }
    });

    // Touch on delete button
    $(document).on('click', '.reminderFunctionBarDelete', function(e){
        let targetID = e.target.closest(".reminderItem").id;
        // Delete object from client side database
        let localDataBaseName = "LitFireDB";
        let todoObjectName = "to_dos"
        let LitFireDB;
        let getRequest;
        let archivedTODO = 0;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
             LitFireDB = event.target.result;
             let UpdateStore = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName);
            getRequest = UpdateStore.get(targetID);
            getRequest.onsuccess = event =>{
                let data = event.target.result;
                console.log(data);
                data.status = archivedTODO;
                let updateRequest = UpdateStore.put(data);
                updateRequest.onsuccess = event => {
                    console.log("Archive TODO success!");
                }

            }

        }
        $(this).closest(".reminderItem").toggle("fold");
    });

    // Touch on delete button
    $(document).on('click', '.reminderFunctionBarUndoArchive', function(e){
        let targetID = e.target.closest(".reminderItem").id;
        console.log(targetID);
        // Delete object from client side database
        let localDataBaseName = "LitFireDB";
        let todoObjectName = "to_dos"
        let LitFireDB;
        let getRequest;
        let liveTODO = 1;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            let UpdateStore = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName);
            getRequest = UpdateStore.get(targetID);
            getRequest.onsuccess = event =>{
                let data = event.target.result;
                data.status = liveTODO;
                let updateRequest = UpdateStore.put(data);
                updateRequest.onsuccess = event => {
                    console.log("Undo Archive TODO success!");
                }
                $.ajax({
                    type:"POST",
                    dataType: "json",
                    data:JSON.stringify(data),
                    url: "/userservice/updateinfo",
                    async:true,
                    crossDomain:true,
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: function (item){
                        console.log(item);
                    },
                    failure:function (msg){
                        console.log(msg);
                    }
                });
                $(this).closest(".reminderItem").toggle("fold");
            }

        }
    });

    /* Functions for click events*/
    /* Click event for reminderContent */
    /* Show main reminder whole container *****************************************************************************/
    $(document).on('click', '.reminderContent', function(e){
        /* Show mainReminderDetailContainer*/
        let targetID = e.target.closest(".reminderItem").id;
        // Delete object from client side database
        let localDataBaseName = "LitFireDB";
        let todoObjectName = "to_dos"
        let LitFireDB;
        let dbeventRequest;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            dbeventRequest = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName).get(targetID);
            dbeventRequest.onsuccess = event =>{
                let datetime = new Date(event.target.result.setTime);
                let month = parseInt(datetime.getMonth())+1;
                let time = datetime.getDate()+"/"+ month+"/"+ datetime.getFullYear()+" "+ datetime.getHours()+":"+ datetime.getMinutes();
                $(".mainReminderDetailContainer .captionContainer .caption").html(event.target.result.caption);
                $(".detailContentContainer .noteContainer .note").html(event.target.result.content);
                $(".detailTimeContainer .setTime").html(time);
                $(".detailContactContainer .contactIconContainer img").attr("src",event.target.result.icon);
                $(".detailContactContainer .contactInfoContainer .caption").html(event.target.result.senderName);
            }

        };
        $(".mainReminderWholeContainer").show();
        $(".mainReminderWholeContainer").animate({bottom:"0"});
    });

    /* Hide mainReminderWholeContainer ********************************************************************************/
    $(document).on('click', '.mainReminderMask', function(){
        /* Show mainReminderDetailContainer*/
        $(".mainReminderWholeContainer").animate({bottom:"-"+$(document).height()+"px"},{duration:300})
        $(".mainReminderWholeContainer").fadeOut();
    });

    /* Show User Info whole container *********************************************************************************/
    $(document).on('click', '.userAccount', function(){
        /* Show mainReminderDetailContainer*/
        $(".mainUserInfoWholeContainer").show();
        $(".mainUserInfoWholeContainer").animate({left:"0px"},300);
        $(".mainViewPortContainer").fadeTo(300,0.5);
    });

    /* Hide User Info whole container *********************************************************************************/
    $(document).on('click', '.mainUserInfoMask', function(){
        /* Show mainReminderDetailContainer*/
        $(".mainUserInfoWholeContainer").animate({left:"-"+$(document).width()+"px"},{duration:300})
        $(".mainUserInfoWholeContainer").fadeOut();
        $(".mainViewPortContainer").fadeTo(300,1);
    });

    /* Main footer function bar  button *******************************************************************************/
    $(".mainFunctionBarButton").click(function (){
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            let userRelationRequest = LitFireDB.transaction([userRelationObjectName], "readwrite").objectStore(userRelationObjectName).getAll();
            let userFlagRequest = LitFireDB.transaction([flagObjectName],"readwrite").objectStore(flagObjectName).getAll();

            /* Render add reminder target list item */
            userRelationRequest.onsuccess = event =>{
                let targetList = "";
                let targetJSONList = event.target.result;
                console.log(targetList);
                for(let i=0; i<targetJSONList.length; i++){
                    targetList +=
                        "<div class='selectionItem' id='"+targetJSONList[i].id+"' name='"+targetJSONList[i].caption+"'>"+
                            "<div class='selectionIconContainer'>"+
                                "<img src="+ targetJSONList[i].icon +">"+
                            "</div>"+
                            "<div class='selectionCaptionContainer'>"+
                                "<div class='caption' >"+
                                    targetJSONList[i].caption+
                                "</div>"+
                            "</div>"+
                        "</div>"
                    ;
                }
                $("#targetSelectionList").html(targetList);
            }
            userFlagRequest.onsuccess = event =>{
                /* Render add reminder flag list item */
                let flagList = "";
                let flagID = "targetSelectionItem";
                let flagJSONList = event.target.result;
                for(let i=0; i<flagJSONList.length; i++){
                    flagList +=
                        "<div class='selectionItem' id='"+flagJSONList[i].id+"'>"+
                            "<div class='selectionIconContainer'>"+
                                "<img src="+ flagJSONList[i].icon +">"+
                            "</div>"+
                            "<div class='selectionCaptionContainer'>"+
                                "<div class='caption' >"+
                                    flagJSONList[i].description+
                                "</div>"+
                            "</div>"+
                        "</div>"
                    ;
                }
                $("#flagSelectionList").html(flagList);

            }

        };

        $(".addReminderWholeContainer").show();
        $(".addReminderWholeContainer").animate({bottom:"0px"},200)
    });

    /* Click on close button and hide *********************************************************************************/
    $(".addReminderHeaderClose").click(function (){
        $(".addReminderWholeContainer").animate({bottom:"-"+$(document).height()+"px"},{duration:200})
        $(".addReminderWholeContainer").fadeOut();
    });



    /* Add reminder page toggle ***************************************************************************************/
    $(".toggleButton").click(function (){
        if($(".detailToggleContainer").is(':visible')){
            $(".addReminderDetailContainer").height($(".addReminderDetailContainer").height()-$(".detailToggleContainer").height());
        }else {
            $(".addReminderDetailContainer").height($(".addReminderDetailContainer").height()+$(".detailToggleContainer").height());
        }
        $(".detailToggleContainer").toggle("fold");
    });

    /* Show userinfo whole container **********************************************************************************/
    $(document).on('click', '#sidebar-list-userProfile', function(e){
        // READ from client side db and inject data to view
        let getAllRequest = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName).getAll();
        getAllRequest.onerror = event =>{
            console.log("error");
        }
        getAllRequest.onsuccess = event => {
            /* Render user info page */
            let userinfoJSON = event.target.result;
            $("#usernameContainer .content").html(userinfoJSON[0].username);
            $("#emailContainer .content").html(userinfoJSON[0].email);

        }
        $(".userInfoWholeContainer").show();
        $(".userInfoWholeContainer").animate({bottom:"0px"});
    });

    /* Hide userinfo whole container **********************************************************************************/
    $(document).on('click', '.userInfoMask', function(){
        /* Show mainReminderDetailContainer*/
        $(".userInfoWholeContainer").animate({bottom:"-"+$(document).height()+"px"},{duration:300})
        $(".userInfoWholeContainer").fadeOut();
    });

    /* Show userinfo whole container **********************************************************************************/
    $(document).on('click', '#sidebar-list-Friends', function(e){
        // READ from client side db and inject data to view
        let getAllRequest = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName).getAll();
        getAllRequest.onerror = event =>{
            console.log("error");
        }
        getAllRequest.onsuccess = event => {
            /* Render user info page */
            let userinfoJSON = event.target.result;
            $("#usernameContainer .content").html(userinfoJSON[0].username);
            $("#emailContainer .content").html(userinfoJSON[0].email);

        }
        $(".friendInfoWholeContainer").show();
        $(".friendInfoWholeContainer").animate({bottom:"0px"});
    });

    /* Hide userinfo whole container **********************************************************************************/
    $(document).on('click', '.friendInfoMask', function(){
        /* Show mainReminderDetailContainer*/
        $(".friendInfoWholeContainer").animate({bottom:"-"+$(document).height()+"px"},{duration:300})
        $(".friendInfoWholeContainer").fadeOut();
    });

    /* Show archived  whole container **********************************************************************************/
    $(document).on('click', '#sidebar-list-archive', function(e){
        /* Render main function to-do list item */
        let list = "";
        let todoID = "todoItem";
        let imgdiv = "<img src='../static/images/arrow_back_white_24dp.svg' id='archiveBackToPrimary'>+" ;
        let headerCaption = "Archive" ;
        // Save client side database object
        let localDataBaseName = "LitFireDB";
        let todoObjectName = "to_dos"
        let LitFireDB;
        let ToDoObject;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            let todoObjectStore = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName);
            let getAllRequest = todoObjectStore.getAll();
            let toDoList;
            getAllRequest.onsuccess = event =>{
                toDoList = event.target.result;
                /* Render main function to-do list item */
                let list = "";
                for(let i=0; i<toDoList.length; i++){
                    if(toDoList[i].status!=0)continue;
                    let datetime = new Date(toDoList[i].setTime);
                    let month = parseInt(datetime.getMonth())+1;
                    list +=
                        "<div class='reminderItem' id='"+toDoList[i].id+"'>"+
                        "<div class='reminderBaseContainer'>"+
                        "<div class='reminderFunctionBarUndoArchive'>" +
                        "<div class='functionBarButtonCaption'>" +
                        "Undo"+
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='reminderContentContainer'>"+
                        "<div class='reminderIconContainer'>"+
                        "<div class='reminderIcon'>" +
                        "<img src="+ toDoList[i].icon +">"+
                        "</div>"+
                        "</div>"+
                        "<div class='reminderContent'>"+
                        "<div class='reminderContentCaption'>"+
                        "<div class='reminderCaptionText' id='"+"Caption"+i+"'>"+toDoList[i].caption+"</div>"+
                        "</div>"+
                        "<div class='reminderContentTime'>"+
                        datetime.getDate()+"/"+
                        month+"/"+
                        datetime.getFullYear()+" "+
                        datetime.getHours()+":"+
                        datetime.getMinutes()+
                        "</div>"+
                        "</div>"+
                        "<div class='reminderFlagContainer'>"+"</div>"+
                        "</div>"+
                        "</div>"
                    ;
                }
                $("#reminderList").html(list);
            }

        }
        $(".functionBar").html(imgdiv);
        $("#pageHeaderCaption").html(headerCaption);
        $(".mainUserInfoWholeContainer").animate({left:"-"+$(document).width()+"px"},{duration:300})
        $(".mainUserInfoWholeContainer").fadeOut();
        $(".mainViewPortContainer").fadeTo(300,1);

    });

    /* Show userinfo whole container **********************************************************************************/
    $(document).on('click', '#sidebar-list-sent', function(e){
        /* Render main function to-do list item */
        let list = "";
        let todoID = "todoItem";
        let imgdiv = "<img src='../static/images/arrow_back_white_24dp.svg' id='archiveBackToPrimary'>+" ;
        let headerCaption = "Sent" ;
        // Save client side database object
        let LitFireDB;
        let ToDoObject;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            let sentObjectStore = LitFireDB.transaction([sentTodoObjectName],"readwrite").objectStore(sentTodoObjectName);
            let getAllRequest = sentObjectStore.getAll();
            let toDoList;
            getAllRequest.onsuccess = event =>{
                toDoList = event.target.result;

                /* Render main function to-do list item */
                let list = "";
                for(let i=0; i<toDoList.length; i++){
                    let datetime = new Date(toDoList[i].setTime);
                    let month = parseInt(datetime.getMonth())+1;
                    list +=
                        "<div class='reminderItem' id='"+toDoList[i].id+"'>"+
                        "<div class='reminderBaseContainer'>"+
                        "<div class='reminderFunctionBarUndoArchive'>" +
                        "<div class='functionBarButtonCaption'>" +
                        "Delete"+
                        "</div>"+
                        "</div>"+
                        "</div>"+
                        "<div class='reminderContentContainer'>"+
                        "<div class='reminderIconContainer'>"+
                        "<div class='reminderIcon'>" +
                        "<img src="+ toDoList[i].icon +">"+
                        "</div>"+
                        "</div>"+
                        "<div class='reminderContent'>"+
                        "<div class='reminderContentCaption'>"+
                        "<div class='reminderCaptionText' id='"+"Caption"+i+"'>"+toDoList[i].caption+"</div>"+
                        "</div>"+
                        "<div class='reminderContentTime'>"+
                        datetime.getDate()+"/"+
                        month+"/"+
                        datetime.getFullYear()+" "+
                        datetime.getHours()+":"+
                        datetime.getMinutes()+
                        "</div>"+
                        "</div>"+
                        "<div class='reminderFlagContainer'>"+"</div>"+
                        "</div>"+
                        "</div>"
                    ;
                }
                $("#reminderList").html(list);
            }

        }
        $(".functionBar").html(imgdiv);
        $("#pageHeaderCaption").html(headerCaption);
        $(".mainUserInfoWholeContainer").animate({left:"-"+$(document).width()+"px"},{duration:300})
        $(".mainUserInfoWholeContainer").fadeOut();
        $(".mainViewPortContainer").fadeTo(300,1);


    });

    /* Show userinfo whole container **********************************************************************************/
    $(document).on('click', '#archiveBackToPrimary', function(e){
        let headerCaption = "TO-DO" ;
        $("#pageHeaderCaption").html(headerCaption);
        $(".functionBar").html("");
        reloadTodos();
    });

    $("#add-friend-button").click(function() {
        let userinfoObjectStore = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName);
        let getUserInfoRequest = userinfoObjectStore.getAll();
        let userInfoID;
        let userName;
        let invitation= {};
        let defaultValue = "";
        let targetEmail = $("#add-invitation-input").val();
        getUserInfoRequest.onsuccess = event => {
            userInfoID = event.target.result[0].id;
            userName = event.target.result[0].username;
            invitation.id = generateUniqueTodoID(userInfoID);
            invitation.senderId = userInfoID;
            invitation.senderName = userName;
            invitation.icon = event.target.result[0].profileavatar;
            invitation.receiverEmail = targetEmail;
            invitation.status = 0;
            invitation.type = 0;
            $.ajax({
                dataType: "json",
                url: "/userservice/sendInvitation",
                method: "POST",
                async:false,
                contentType: "application/json",
                data:JSON.stringify(invitation),
                crossDomain:true,
                xhrFields: {
                    withCredentials: true,
                },
                success: function (response){
                    alert(response.msg);
                },
                failure:function (response){
                    alert(response.msg);
                }
            });
        }

    });

    $(document).on('click', "#consent-friend-button", function(e) {
        let targetID = e.target.closest(".reminderItem").id;
        // Delete object from client side database
        let localDataBaseName = "LitFireDB";
        let friendObjectName = "friends"
        let LitFireDB;
        let getRequest;
        let consented = 1;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            let UpdateStore = LitFireDB.transaction([friendObjectName],"readwrite").objectStore(friendObjectName);
            getRequest = UpdateStore.get(targetID);
            getRequest.onsuccess = event =>{
                let data = event.target.result;
                console.log(data);
                data.status = consented;
                let userinfoObjectStore = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName);
                let getUserInfoRequest = userinfoObjectStore.getAll();
                getUserInfoRequest.onsuccess = event => {
                    data.senderEmail = event.target.result[0].email;
                    $.ajax({
                        dataType: "json",
                        url: "/userservice/consentInvitation",
                        method: "POST",
                        async:false,
                        contentType: "application/json",
                        data:JSON.stringify(data),
                        crossDomain:true,
                        xhrFields: {
                            withCredentials: true,
                        },
                        success: function (response){
                            if(response.status==200){
                                let UpdateStore = LitFireDB.transaction([friendObjectName],"readwrite").objectStore(friendObjectName);
                                let updateRequest = UpdateStore.put(data);
                                updateRequest.onsuccess = event => {
                                    console.log("constented")
                                }
                                alert(response.msg);
                            }
                        },
                        failure:function (response){
                        }
                    });
                }

            }
        }
        $("#"+targetID).toggle("fold");
    });

    $(document).on('click', "#decline-friend-button", function(e) {
        let targetID = e.target.closest(".reminderItem").id;
        // Delete object from client side database
        let localDataBaseName = "LitFireDB";
        let friendObjectName = "friends"
        let LitFireDB;
        let getRequest;
        let declined = 2;
        // Open client side database
        let request = window.indexedDB.open(localDataBaseName, dbVersion);
        request.onerror = event => {
            console.log("Open Client Side DB Failed");
        };
        // Open DB success update data and inject data to view
        request.onsuccess = event =>{
            LitFireDB = event.target.result;
            let UpdateStore = LitFireDB.transaction([friendObjectName],"readwrite").objectStore(friendObjectName);
            getRequest = UpdateStore.get(targetID);
            getRequest.onsuccess = event =>{
                let data = event.target.result;
                console.log(data);
                data.status = declined;
                $.ajax({
                    dataType: "json",
                    url: "/userservice/declineInvitation",
                    method: "POST",
                    async:false,
                    contentType: "application/json",
                    data:JSON.stringify(data),
                    crossDomain:true,
                    xhrFields: {
                        withCredentials: true,
                    },
                    success: function (response){
                        if(response.status==200){
                            let updateRequest = UpdateStore.put(data);
                            updateRequest.onsuccess = event => {
                                console.log("Declined!");
                            }
                        }
                        alert(response.msg);
                    },
                    failure:function (response){
                    }
                });
            }
        }
        $("#"+targetID).toggle("fold");
    });



    /* Bind reminder input to draft ***********************************************************************************/
    let addReminderDraft = {}
    let defaultDraftValue = "";
    addReminderDraft.caption="New TO-DO";
    addReminderDraft.note=defaultDraftValue;
    addReminderDraft.url=defaultDraftValue;
    addReminderDraft.date=defaultDraftValue;
    addReminderDraft.target=defaultDraftValue;
    addReminderDraft.flag=defaultDraftValue;

    $("#reminder-caption-input").bind("change paste keyup", function() {
        addReminderDraft.caption=$(this).val();
    });
    $("#reminder-note-input").bind("change paste keyup", function() {
        addReminderDraft.note=$(this).val();
    });
    $("#reminder-url-input").bind("change paste keyup", function() {
        addReminderDraft.url=$(this).val();
    });
    $("#reminder-date-input").bind("change paste keyup", function() {
        addReminderDraft.date=$(this).val()+":00.000Z";
        console.log($(this).val()+":00.000Z");
    });
    $(document).on('click', '#targetSelectionList .selectionItem', function(e){
        addReminderDraft.target=$(this).attr("id");
        $(".detailTargetContainer .titleInputContainer input").val($(this).attr("name"));
    });
    $(document).on('click', '#flagSelectionList .selectionItem', function(e){
        addReminderDraft.flag=$(this).attr("id");
    });

    $(".addReminderDetailFooterContainer .addButton").click(function (){
        updateLocalInfo(addReminderDraft);
    });
    /* End of Bind reminder input to draft ****************************************************************************/

    /* Update Local info **********************************************************************************************/
    function updateLocalInfo(addReminderDraft){
        let defaultFlag = "F0";
        let defaultType = "1";
        let defaultStatus = "1";
        let addItem = {};
        let defaultIcon = "static/images/icons/example.png";

        let userinfoObjectStore = LitFireDB.transaction([userinfoObjectName],"readwrite").objectStore(userinfoObjectName);
        let getUserInfoRequest = userinfoObjectStore.getAll();
        let userInfoID;
        let userName;
        getUserInfoRequest.onsuccess = event =>{
           userInfoID = event.target.result[0].id;
           defaultIcon = event.target.result[0].profileavatar;
           userName = event.target.result[0].username;
            if (addReminderDraft.target == defaultDraftValue){
                addReminderDraft.target = userInfoID;
            }
            if (addReminderDraft.flag == defaultDraftValue){
                addReminderDraft.flag = defaultFlag;
            }
            if (addReminderDraft.date == defaultDraftValue){
                addReminderDraft.date = new Date().toISOString();
            }
            addItem.id = generateUniqueTodoID(userInfoID);
            addItem.senderId = userInfoID;
            addItem.senderName = userName;
            addItem.receiverId = addReminderDraft.target;
            addItem.type = defaultType;
            addItem.icon = defaultIcon;
            addItem.caption = addReminderDraft.caption;
            addItem.content = addReminderDraft.note;
            addItem.URL = addReminderDraft.url;
            addItem.setTime = addReminderDraft.date;      //new Date().toISOString()
            addItem.sendTime = new Date().toISOString();
            addItem.status = defaultStatus;
            addItem.flag = addReminderDraft.flag;
            console.log(addItem);
            let localStore = LitFireDB.transaction([localStoreTodoObjectName],"readwrite").objectStore(localStoreTodoObjectName);
            let localStoreRequest = localStore.add(addItem);
            localStoreRequest.onsuccess = event =>{
                console.log("Local Stored Success");
            }
            uploadLocalTodos();
            if(addItem.receiverId == addItem.senderId){
                let todoObjectStore = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName);
                let addRequest = todoObjectStore.add(addItem);
                addRequest.onsuccess = event =>{
                    console.log("Add Item Success");
                    reloadTodos();
                    $(".addReminderWholeContainer").animate({bottom:"-"+$(document).height()+"px"},{duration:200})
                    $(".addReminderWholeContainer").fadeOut();
                }
            }else {
                let sentObjectStore = LitFireDB.transaction([sentTodoObjectName],"readwrite").objectStore(sentTodoObjectName);
                let addRequest = sentObjectStore.add(addItem);
                addRequest.onsuccess = event =>{
                    console.log("Add Item Success");
                    reloadTodos();
                    $(".addReminderWholeContainer").animate({bottom:"-"+$(document).height()+"px"},{duration:200})
                    $(".addReminderWholeContainer").fadeOut();
                }
            }
        }

    }
    /* End of Update Local info ***************************************************************************************/

    // Reload todos
    function reloadTodos(){
        // READ from client side db and inject data to view
        let getAllRequest = LitFireDB.transaction([todoObjectName],"readwrite").objectStore(todoObjectName).getAll();
        let toDoList;
        getAllRequest.onerror = event =>{
            console.log("error");
        }
        getAllRequest.onsuccess = event =>{
            toDoList = event.target.result;
            /* Render user info page */
            //$("#userInfoHeaderAvatar").attr("src",userinfoJSON[0].profileavatar);

            /* Render main function to-do list item */
            let list = "";
            for(let i=0; i<toDoList.length; i++){
                if(toDoList[i].status!=1)continue;
                let datetime = new Date(toDoList[i].setTime.slice(0,-1));
                console.log(datetime);
                let month = parseInt(datetime.getMonth())+1;
                list +=
                    "<div class='reminderItem' id='"+toDoList[i].id+"'>"+
                    "<div class='reminderBaseContainer'>"+
                    "<div class='reminderFunctionBarDelete'></div>"+
                    "</div>"+
                    "<div class='reminderContentContainer'>"+
                    "<div class='reminderIconContainer'>"+
                    "<div class='reminderIcon'>" +
                    "<img src="+ toDoList[i].icon +">"+
                    "</div>"+
                    "</div>"+
                    "<div class='reminderContent'>"+
                    "<div class='reminderContentCaption'>"+
                    "<div class='reminderCaptionText' id='"+"Caption"+i+"'>"+toDoList[i].caption+"</div>"+
                    "</div>"+
                    "<div class='reminderContentTime'>"+
                    datetime.getDate()+"/"+ month+"/"+ datetime.getFullYear()+" "+ datetime.getHours()+":"+ datetime.getMinutes()+
                    "</div>"+
                    "</div>"+
                    "<div class='reminderFlagContainer'>"+"</div>"+
                    "</div>"+
                    "</div>"
                ;
            }
            $("#reminderList").html(list);
        }
    }


    // Upload local todos to server
    function uploadLocalTodos(){
        let getAllRequest = LitFireDB.transaction([localStoreTodoObjectName],"readwrite").objectStore(localStoreTodoObjectName).getAll();
        getAllRequest.onerror = event =>{
            console.log(event.target.result);
            console.log("error");
        }
        getAllRequest.onsuccess = event =>{
            let todoList = event.target.result;
            console.log(todoList);
            $.ajax({
                dataType: "json",
                url: "/userservice/addNewtodo",
                method: "POST",
                async:true,
                contentType: "application/json",
                data:JSON.stringify(todoList),
                crossDomain:true,
                xhrFields: {
                    withCredentials: true,
                },
                success: function (response){
                    console.log(response.msg);
                },
                failure:function (response){
                    console.log(response.msg)
                }
            });
        }
    }


})
function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {

    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            console.log("denied");

        });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.
}


function generateUniqueUserID(username){
    let userIdPattenLength = 8;
    let userIdPatten = ""
    let datetime = Date.now();

    if(username.length<userIdPattenLength){
        userIdPatten = username;
        for(let i =username.length;i<userIdPattenLength;i++){
            userIdPatten = userIdPatten+Math.floor(Math.random()*10);
        }
        userIdPatten = userIdPatten+"U"+datetime;
        return userIdPatten;
    }else if(username.length>=userIdPattenLength){
        userIdPatten = username.slice(0,8);
        userIdPatten = userIdPatten+"U"+datetime;
        return userIdPatten;
    }

}

function generateUniqueTodoID(userID){
    let todoIDPatten = "";
    let datetime = Date.now();
    todoIDPatten = userID + "T" +datetime;
    return todoIDPatten;
}

// Convert rem to px
function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function urlBase64ToUint8Array(base64String) {
    let padding = '='.repeat((4 - base64String.length % 4) % 4);
    let base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    let rawData = window.atob(base64);
    let outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}