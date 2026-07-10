package vn.elca.ptp;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.TimeZone;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;

@SpringBootTest
class PtpServerApplicationTests {

    @Test
    void contextLoads() {
    }

    @DynamicPropertySource
    static void loadEnv(DynamicPropertyRegistry registry) throws IOException {
        Path envFile = Paths.get(System.getProperty("user.dir"), "..", ".env").normalize();
        if (Files.exists(envFile)) {
            try (Stream<String> lines = Files.lines(envFile)) {
                lines.filter(line -> line.contains("="))
                        .map(line -> line.split("=", 2))
                        .forEach(parts -> registry.add(parts[0].trim(), () -> parts[1].trim()));
            }
        }

        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
    }
}
