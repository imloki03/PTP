package vn.elca.ptp.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI ptpOpenApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("PTP API")
                        .description("Personal Travel Plan — Journey management")
                        .version("0.0.1-SNAPSHOT"));
    }
}
