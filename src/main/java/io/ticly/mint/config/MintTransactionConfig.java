package io.ticly.mint.config;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.interceptor.DefaultTransactionAttribute;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionInterceptor;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;


/**
 * Transaction aop 설정
 * @create 2020.08.07
 */
@Aspect
@Configuration
public class MintTransactionConfig {

    @Value("${mint.config.transaction.aop}")
    private String mintConfigTransactionAopPointCut;

    @Qualifier("transactionManager")
    private DataSourceTransactionManager transactionManager;

    public MintTransactionConfig(DataSourceTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    /**
     * Transaction Interceptor txAdvice 설정
     * @return
     */
    @Bean("txAdvice")
    public TransactionInterceptor txAdvice() {
        TransactionInterceptor transactionInterceptor = new TransactionInterceptor();
        Properties txAttributes = new Properties();
        List<RollbackRuleAttribute> rollbackRuleAttributes = new ArrayList<>();
        rollbackRuleAttributes.add(new RollbackRuleAttribute(Exception.class));
        DefaultTransactionAttribute defaultTransactionAttribute = new DefaultTransactionAttribute(TransactionDefinition.PROPAGATION_REQUIRED);
        defaultTransactionAttribute.setReadOnly(true);
        defaultTransactionAttribute.setTimeout(30);

        RuleBasedTransactionAttribute ruleBasedTransactionAttribute = new RuleBasedTransactionAttribute(TransactionDefinition.PROPAGATION_REQUIRED, rollbackRuleAttributes);
        ruleBasedTransactionAttribute.setTimeout(30);

        String readOnlyDefinition = defaultTransactionAttribute.toString();
        String writerDefinition = ruleBasedTransactionAttribute.toString();

        txAttributes.setProperty("get*", readOnlyDefinition);
        txAttributes.setProperty("find*", readOnlyDefinition);

        txAttributes.setProperty("save*", writerDefinition);
        txAttributes.setProperty("update*", writerDefinition);
        txAttributes.setProperty("delete*", writerDefinition);
        transactionInterceptor.setTransactionAttributes(txAttributes);
        transactionInterceptor.setTransactionManager(transactionManager);

        return transactionInterceptor;
    }

    /**
     * PointCut설정
     * @param transactionInterceptor
     * @return
     */
    @Bean
    public Advisor advisor(@Qualifier("txAdvice") TransactionInterceptor transactionInterceptor) {
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression(mintConfigTransactionAopPointCut);
        return new DefaultPointcutAdvisor(pointcut, transactionInterceptor);
    }
}
