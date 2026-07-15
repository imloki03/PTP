package vn.elca.ptp.common.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;

@Component
@ConditionalOnProperty(name = "ptp.simulated-delay-ms")
public class SimulatedDelayFilter implements Filter {
    private final int delayMs;

    SimulatedDelayFilter(@Value("${ptp.simulated-delay-ms}")
            int delayMs) {
        this.delayMs = delayMs;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            Thread.sleep(delayMs);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        chain.doFilter(request, response);
    }
}
