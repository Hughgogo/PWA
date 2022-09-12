package com.example.kkdemo_version1;

import com.example.kkdemo_version1.Config.GoogleCloudClient;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@EnableScheduling
@SpringBootApplication
@MapperScan(basePackages = "com/example/kkdemo_version1/Mappers")
public class KkDemoVersion1Application {

    public static void main(String[] args){
        SpringApplication.run(KkDemoVersion1Application.class, args);
    }

}
