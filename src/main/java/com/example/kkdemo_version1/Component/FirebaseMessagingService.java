package com.example.kkdemo_version1.Component;

import com.example.kkdemo_version1.Mappers.MessageMybatisRepository;
import com.example.kkdemo_version1.Mappers.UserMybatisRepository;
import com.example.kkdemo_version1.Model.User;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.*;
import java.time.*;
import java.util.Date;
import java.util.List;
import java.util.Map;


/**
* Push notification through firebase messaging
*/
@Component
public class FirebaseMessagingService {

    private MessageMybatisRepository messageMybatisRepository;
    private UserMybatisRepository userMybatisRepository;

    private ResourceLoader resourceLoader;

    @Autowired
    public void setResourceLoader(ResourceLoader resourceLoader) {
        this.resourceLoader = resourceLoader;
    }

    @Autowired
    public void setMessageMybatisRepository(MessageMybatisRepository messageMybatisRepository) {
        this.messageMybatisRepository = messageMybatisRepository;
    }
    @Autowired
    public void  setUserMybatisRepository(UserMybatisRepository userMybatisRepository){
        this.userMybatisRepository = userMybatisRepository;
    }

    public String sendNotification(com.example.kkdemo_version1.Model.Message note, String token,FirebaseMessaging firebaseMessaging) throws FirebaseMessagingException {

        Notification notification = Notification
                .builder()
                .setTitle(note.getMessages_caption())
                .setBody(note.getMessages_content())
                .build();

        Message message = Message
                .builder()
                .setToken(token)
                .setNotification(notification)
                .build();

        return firebaseMessaging.send(message);
    }

    public  FirebaseApp GetFirebaseApp() throws IOException {
        String userDirectory = new File("").getAbsolutePath();
        Resource resource = resourceLoader.getResource("classpath:static/firebase.json");
        InputStream serviceAccount = resource.getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setProjectId("hughgogo-litfire")
                //.setDatabaseUrl("https://<DATABASE_NAME>.firebaseio.com/")
                .build();
        FirebaseApp app = FirebaseApp.initializeApp(options);
        //FirebaseMessaging.getInstance(app)
        return app;
    }


    @Scheduled(fixedRate = 10000)
    public void scheduleFireBaseMessaging()  {
            List<com.example.kkdemo_version1.Model.Message> list = messageMybatisRepository.findActive();
        for (com.example.kkdemo_version1.Model.Message activeMessage:
             list) {

            LocalDateTime ldt = LocalDateTime.now();
            ZonedDateTime zonedDateTime =ldt.atZone(ZoneId.of("UTC"));

            long timeStampMillis = zonedDateTime.toInstant().toEpochMilli();
            Instant messageDate = Instant.parse(activeMessage.getMessages_setTime());
            long messageDateMillis = messageDate.toEpochMilli();
            if(Math.abs(messageDateMillis-timeStampMillis)<10000){
                User activeUser = userMybatisRepository.findById(activeMessage.getMessages_receiverId());
                // registration token.
                String registrationToken = activeUser.getUsers_device_token();
                // Send a message to the device corresponding to the provided
                Message message = Message.builder()
                        .putData("title",activeMessage.getMessages_caption())
                        .putData("body",activeMessage.getMessages_content())
                        .putData("icon",activeMessage.getMessages_icon())
                        .setToken(registrationToken)
                        .build();
                try{
                    String response = FirebaseMessaging.getInstance().send(message);
                    // Response is a message ID string.
                    System.out.println("Successfully sent message: " + response);
                    activeMessage.setMessages_status("2");
                    messageMybatisRepository.update(activeMessage);
                }catch (FirebaseMessagingException e){
                    System.out.println("Send message failed");
                }
            }

        }

    }



    public String SendFireBaseMessage(String registrationToken) throws FirebaseMessagingException {

        // See documentation on defining a message payload.
        Message message = Message.builder()
                .putData("title","Litfire")
                .putData("body","Hello There!")
                .setToken(registrationToken)
                .build();

        // Send a message to the device corresponding to the provided
        // registration token.
        String response = FirebaseMessaging.getInstance().send(message);
        // Response is a message ID string.
        System.out.println("Successfully sent message: " + response);
        return response;
    }


}