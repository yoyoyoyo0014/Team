package kr.kh.ebook.config;
import com.siot.IamportRestClient.IamportClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IamportConfig {

    @Bean
    public IamportClient iamportClient() {
        // Iamport에서 발급받은 REST API 키와 비밀키를 사용
        return new IamportClient("5310441564486521", "W763txQUqDtd7wFj32FnLMDDPLw00XkrvqeUIrjkcoGy2YzKlIUyRQ6xUCmkIXh6Wv2RoLz4KCzaPfVz");
    }
}


