package io.ticly.mint.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;

/**
 * Mybatis 설정
 * @create 2020.08.05
 * @author kimbogeun
 */
@Configuration
public class MintMybatisConfig {

    //Mybatis Mapper의 위치를 알려주는 properties property
    @Value("${mint.config.db.mybatis-mapper-path}")
    private String mybatisMapperPath;

    //Mybatis 자체 설정 XML 위치를 알려주는 properties property
    @Value("${mint.config.db.mybatis-config-path}")
    private String mybatisConfigPath;

    /**
     * 생명주기 및 위치설정
     * @param dataSource
     * @return
     * @throws Exception
     */
    @Bean("sqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource);
        sqlSessionFactoryBean.setConfigLocation(new PathMatchingResourcePatternResolver().getResource(mybatisConfigPath));
        sqlSessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources(mybatisMapperPath));
        return sqlSessionFactoryBean.getObject();
    }

    /**
     * 사용할 MYBATIS SESSION TEMPLATE
     * @param sqlSessionFactory
     * @return
     */
    @Bean
    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }

    /**
     * TransactionManager DataSource 설정
     * @param dataSource
     * @return
     */
    @Bean("transactionManager")
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }
}
